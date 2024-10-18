---
title: Automatic Flake Updates with Garnix
description: Ever had to sit through obnoxiously long builds when updating your flake inputs? This article describes how to use Garnix to automate and cache this process.
date: 2024-10-17 EST
tags:
  - nix
  - ci/cd
  - tutorial
published: true
---
Ever had to sit through obnoxiously long builds when updating your flake inputs? This article describes how to use Garnix to automate and cache this process. The end product is a pipeline that automatically updates the inputs for a flake, builds the outputs of that flake, and intelligently merges the updated changes based on the success or failure of those builds. At the same time, any built derivations that are not present in the NixOS cache are uploaded to the Garnix cache, vastly speeding up the process of switching to the updated flake inputs locally.

This article assumes basic knowledge of [Nix and NixOS](https://nixos.org/), as well as familiarity with [flakes](https://www.tweag.io/blog/2020-05-25-flakes/) and [using flakes to manage NixOS systems](https://www.tweag.io/blog/2020-07-31-nixos-flakes/). If you are not yet familiar, and have some free time, I would highly recommend giving Nix, NixOS, and flakes a look. They may have a steep learning curve (especially if you are not familiar with Linux systems), but I believe the payoff is well worth it. That being said, this article will not be of any use to someone who doesn't already use Nix in some capacity.

## Overview

Before getting started, I just want to introduce some terms, and go through some prerequisites for any of this to work.
Throughout this article I will use the term "your repository" in reference to the repository for which you would like to setup this pipeline. Your repository **must be a Nix flake** (i.e., have a `flake.nix` file) as Garnix only works with flakes, and **should be hosted with GitHub**. Additionally, the branch protection rules used to prevent erroneous merges are available for public repositories but are blocked behind a paywall for private repositories.

The rest of this article is split into two main sections:
1. Setting up Garnix
2. Configuring GitHub

and I'll dive into each of these in detail in the following sections.

## Garnix
[Garnix](https://garnix.io) is a CI/CD tool whose main purpose is to speed up existing methods of using Nix in CI/CD pipelines by using more efficient caching techniques than existing options. For our purposes, it has a good free tier (1500 mins of build time per month), and a very simple setup. To get Garnix working for our use case, we only have to do three things:

1. Sign up to Garnix
2. Add Garnix to your repository
3. Add a Garnix configuration file *(optional)*

### Sign up to Garnix
This step is self explanatory: sign up to Garnix with your GitHub account at [https://garnix.io/signup](https://garnix.io/signup). Take the time to read exactly what permissions the Garnix app is requesting and make sure that you are actually comfortable with Garnix having those permissions. I am not saying this because Garnix is particularly untrustworthy, this is just good practice for authorizing any third party application with GitHub, or any service for that matter.

### Add Garnix to Your Repository
If you have never used Garnix before, you can simply go to [https://garnix.io](https://garnix.io) after signing up and follow the directions for setting up your first repository. Again, the Garnix app will request some permissions, and I would **highly recommend** only giving permissions for the specific repository for which you want to setup this pipeline. Always apply the least permissions model. Once you have installed Garnix on that repository, you are done messing with Garnix.

If you have previously setup Garnix, or the previous method is not working, you can go directly to [https://github.com/settings/installations](https://github.com/settings/installations) and configure the Garnix app, giving it permissions for the repositories you need. This is also the right place to go if you want to remove Garnix in the future.

### Add a Garnix Configuration File
This step is optional, but if you only want Garnix to build your repository for this pipeline, or you want to skip certain outputs of your flake, you will need to add a configuration file for Garnix into the root of your repository. An example configuration might be:

```yaml title="garnix.yaml"
builds:
  exclude:
    - 'nixosConfigurations.test'   # Skip tests
  include:
    - 'packages.x86_64-linux.*'    # Build all packages for x86_64-linux
    - 'homeConfigurations.*'       # Build all Home Manager configurations
    - 'nixosConfigurations.*'      # Build all NixOS configurations
  branch: update_flake_lock_action # Only run build on action branch
```

If you want to do something more sophisticated, or just read up on all the options, check out the [documentation](https://garnix.io/docs/yaml_config).

## GitHub
The next phase of getting this setup is getting GitHub setup. There are a few parts to this:
1. Configuring a branch ruleset for your repository
2. Allow actions to create and approve pull requests
3. Allowing auto-merge
4. Setting up a CI/CD pipeline to automatically update your inputs

### Configure Branch Ruleset
The purpose of this step is to ensure that the only way the `flake.lock` file is updated in your repository is if the flake actually builds successfully. This is one of the main advantages of this approach: you never need to attempt to build your machine with updated inputs locally. Either the pipeline will succeed and the known good `flake.lock` will be merged into your main branch, or it will fail and you will simply get a notification that the PR for updating the flakes did not pass the checks, with log files to help you narrow down what is failing.

To configure a branch ruleset for the target branch of your repository, simply go to the settings for the repository, select `Branches` in the `Code and automation` section, and then click `Add branch ruleset`. Choose a `Ruleset Name` (such as `Garnix Status Checks`), set the `Enforcement status` to `Active`, and select the relevant branch(es) under `Targets` (most likely just the default branch).

You will probably also want to add a bypass so you can still push to the repository without the passing the checks. From testing I have found that setting a bypass for the `Write` role will work.

Under the branch rules, check `Require status checks to pass`. Finally, select the status checks which you want to require. To make this easier, wait for the default Garnix job to complete on your main branch, which will make the status checks produced by Garnix autocomplete. The simplest status check is `All Garnix checks`, which will force every Garnix status check to pass. This includes running tests, checking that packages, NixOS configurations, and home manager configurations build, as well as ensuring that the flake is valid Nix.

For a more granular approach, you can select specific status checks provided by Garnix. Some of the valid status checks are shown here:

| Status Check Name                   | What it Ensures                                        |
| :---------------------------------- | :----------------------------------------------------- |
| `Evaluate flake.nix`                | Your flake is valid nix                                |
| `nixosConfig <config-name>`         | `nixosConfiguration.<config-name>` builds successfully |
| `homeConfig <config-name>`          | `homeConfigurations.<config-name>` builds successfully |
| `package <package-name> [<system>]` | `packages.<system>.<package-name>` builds successfully |

Note that these different options should autocomplete as you enter them, as long as Garnix has performed a build.

Finally, read through the other branch protection rules, as some of them are enabled by default and may not be desirable, or you may want to enable some other requirement, such as linear history.

Make sure to save your changes!

### Allow GitHub Actions to Create and Approve Pull Requests
While we are here, to allow the `update-flake-lock` action described in the next section to function properly, you must allow GitHub actions to create and approve pull requests. This is done by going to `Actions > General` under `Code and automation` in the repository settings, and at the very bottom checking the box labeled `Allow GitHub Actions to create and approve pull requests`. Make sure to save.

You can also check [this tutorial](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#preventing-github-actions-from-creating-or-approving-pull-requests) if the above was not clear or is not working.

### Enabling Auto Merge
In order for the `--auto` flag to work for `gh pr merge`, we need to enable automatic merging on the repository.
To enable auto merging, go to the `General` section of the repository settings, search for the option `Allow auto-merge`, and enable the setting.

You can also check [this tutorial](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-auto-merge-for-pull-requests-in-your-repository) if the above was not clear or is not working.


### Configure CI/CD Job
The next step is to configure the GitHub CI/CD job which will update your flake inputs.
We will utilize the [DeterminateSystems/update-flake-lock](https://github.com/DeterminateSystems/update-flake-lock) action to update the flake inputs.
To do this, create the following file in your repository:

```yaml title=".github/workflows/update-flake-lock.yml"
name: update-flake-lock
on:
  workflow_dispatch: # allows manual triggering
  schedule: # run the job at 04:00 every 3 days
    - cron: '0 4 */3 * *'
jobs:
  lockfile:
    permissions:
      contents: write
      pull-requests: write
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Install Nix
        uses: DeterminateSystems/nix-installer-action@main
      - name: Update flake.lock
        uses: DeterminateSystems/update-flake-lock@main
        id: update
        with:
          commit-msg: "chore(flake): bump inputs"
          pr-title: "chore(flake): bump inputs"
          pr-labels: |
            dependencies
            automated
      - run: |
          if [ -n "${{ steps.update.outputs.pull-request-number }}" ]; then
            gh pr merge --auto --rebase ${{ steps.update.outputs.pull-request-number }}
          fi
        env:
          GH_TOKEN: ${{ github.token }}
```
This job is based off of the [example given in the DeterminateSystems/update-flake-lock](https://github.com/DeterminateSystems/update-flake-lock?tab=readme-ov-file#example) repo. The first three steps of the `lockfile` job are simply to update your flake inputs, but the magic happens in the last step. This step runs a bash command that checks to see if a PR was successfully created in the previous step, and if it was, set it to auto-merge using the rebase strategy.

Since we have the branch protection rules enabled from before, this auto-merge will only trigger once the checks have passed, or in other words, once all the selected outputs of your flake are built and tested successfully. Using a rebase strategy also ensures that we have a nice linear commit history without annoying merge commits.

## Wrapping Up

That covers all of the setup, and the automatic builds should be functional at this point. There are a few more things to touch on before testing everything we have setup so far.

### Using the Cache
While this setup would be useful *just* to make sure that you only ever update flake inputs to a functional state, you almost certainly want to use the cache that Garnix creates. This unlocks the full benefits of this setup, providing fast updates and pre-built versions of unfree software. This is simply done by adding the Garnix cache to your substituters. If you are not familiar with how to set that up, do some research online (I would point you to a good article about it, but I don't know of one). The appropriate URL and trusted public key are available from [https://garnix.io/docs/caching](https://garnix.io/docs/caching).

### Miscellaneous Notes
- If your flake inputs are already up to date, no PR will be created.
- If the action reruns while an old PR is still open, the action will update the existing PR, instead of creating a new one.
- By default Garnix uses a public and unauthenticated cache.
  - This means that anything compiled as part of your flake is inherently public. However, the build hash is needed to actually fetch the result from the cache, making it theoretically inaccessible unless someone already has the source.
  - Garnix does have private caches, but at the time of writing you must contact Garnix directly to get access to this feature.
- You can check on how many minutes of your max you have used at the [Garnix account page](https://garnix.io/account).

## Testing it Out
Everything should be set up, so let's test it out! Go to the `Actions` tab in the repository, select the `update-flake-lock` workflow from the left, and then run the workflow manually using `workflow_dispatch` trigger. You need to run the workflow on the branch which you have been targeting throughout this tutorial, likely `main` or your default branch. If all goes well, the action should update your inputs and create a PR. Garnix will then run your checks, and in the process populate the Garnix cache with anything which needs to be built, and if the checks succeed the PR will be rebased onto your main branch.

And that's it! Now, if you pull the changes from GitHub and rebuild your system, you should notice that instead of building anything the compiled artifacts will simply be fetched from the Garnix cache. With the how the action is setup, it will also run automatically every three days, and if it ever fails, the PR will simply remain open.

Enjoy the saved time!
