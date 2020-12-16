# A Summer at Intuit

13 August 2020

[My Argo Issues and Pull Requests](https://github.com/pulls?q=author%3Arbreeze+repo%3Aargoproj%2Fargo+repo%3Aargoproj%2Fargo-cd+sort%3Acreated-asc)

# INTRO 

My name is [Remington](https://breeze.software), and I’m a software engineering intern working on the [Argo Project](https://argoproj.github.io) at Intuit. 

I’m a Computer Science masters student at CSU Chico, which is about 2 hours north of Sacramento in Northern California. In addition to my career interests I like to run long distance and draw.

Moving on to the project, Argo is a set of tools for getting things done with Kubernetes, and is now an incubating project in the [Cloud Native Computing Foundation](https://www.cncf.io). I spent most of my time working on [Argo Workflows](https://github.com/argoproj/argo) - a Kubernetes native workflow engine - and [Argo CD](https://argoproj/argo-cd) - a declarative GitOps delivery tool. 

Argo is also open source, which made for a unique, valuable and educational internship experience. Having never contributed to a large open source project before, I learned a lot about working with a team to deliver features and address issues opened by a large community.

# OVERVIEW

I spent the first 2/3 of the internship working mostly on Argo Workflows, and the last several weeks working on Argo CD. However, in my eyes, my internship had three overarching phases:

1. Improving the overall user interface and experience while learning about Kubernetes and Argo Workflows.
2. Diving deep into the core code of Argo Workflows by implementing a memoization feature. 
3. Migrating to CD and applying what I learned from Workflows, as well as prior personal experience, to a significant redesign of part of the CD user interface.

# PHASE 1

I began by working on smaller issues that didn’t require much K8S background. I gradually picked up more about K8S primarily from my mentor Simon, but also through stand ups and my own research. 

As someone who had never worked with Kubernetes at this level before, I also felt that I had a unique perspective of Argo Workflows and this was the inspiration for many of the early enhancements I made. I strongly believe in creating enjoyable user experiences, even for engineers. The easier any software is to use the less support tickets we get and the more productive we can be. I’d like to showcase a few contributions I made in this section.

## @LATEST ALIAS

My first contribution to the Argo Project was opening an issue for an idea: when going through Argo Workflows’ getting started guide I noticed I was copying and pasting a lot of workflow names, and I wanted an easy way to act on a workflow I just submitted. We discussed different solutions and settled on an alias - [@latest](https://github.com/argoproj/argo/pull/3179) - that can be used with any relevant CLI command. I’ll demo this quickly here. 

This was a great introduction to Golang, because I’d never coded in Go before and the CLI code isn’t terribly complex. I also got a small intro to the controller here because I had to make changes to it for this to work.

## WORKFLOWS DRAWER

Before I began work on the @latest alias, I picked up an [issue](https://github.com/argoproj/argo/issues/2782) in which a user requested a new column in the Workflows List view to display labels. This feature became my [second PR](https://github.com/argoproj/argo/pull/3143), and soon after this column evolved into an entirely new UI element that I call the [Workflow Drawer](https://github.com/argoproj/argo/pull/3151). I’ll demo this now.

In the process of creating this drawer, we also discovered that the UI was inadvertently receiving far too much information for each workflow from the API, which was causing problems for users with hundreds of workflows. I [fixed the API](https://github.com/argoproj/argo/pull/3165) to address this, and as a result the Workflows List view can now handle thousands of workflows. Additionally, the information displayed in the Workflows Drawer is not loaded from the server until a user actually clicks the `more` button.

## BATCH SELECTION

The last portion of this phase was adding a [batch selection feature](https://github.com/argoproj/argo/pull/3234) to the Workflows List. I was already very familiar with this section of the UI code, so adding this was straightforward, but I’ve received a lot of positive feedback for this as I think it was a common pain point for users. I’ll demo this quickly now. 

# PHASE 2: MEMOIZATION

After a few weeks I got into the rhythm of making regular contributions in the form of smaller/medium features as detailed previously, as well as smaller bug fixes. Jesse (my manager) and Simon began discussing with me the idea of a larger contribution I could make, and we settled on the addition of caching to Argo Workflows. 

In adding this feature, I quickly found out that the actual MVP implementation takes up a very small percentage of the time and work. I spent about a month working on this, but had a demo-able implementation working within a week- the rest of the time was spent writing and debugging tests, debugging edge cases, and addressing feedback from code review. I saw in a very tangible way that it’s not enough to hash out some quick and dirty code that’s untestable, unmaintainable, and unreliable - especially in an open source project that runs on enterprise production K8S clusters. 

To quickly explain the feature: memoization is the process of storing the results of expensive processes in a cache to save time and resources later on. In the context of a workflow, this means saving the outputs of a template to a ConfigMap that we use as a cache, and a key is specified by the user. Later we hope to add support for other persistence layers like Redis. Here’s an example of a workflow taking advantage of this.

I’d like to briefly go over the [heart of the code](https://github.com/argoproj/argo/blob/master/workflow/controller/cache/cache.go) for this feature because I’m especially proud of these contributions.  

# PHASE 3: ARGO CD

Finally I’d like to discuss the last few weeks working on Argo CD. It took me longer than I expected to get to a point where I was no longer working on new things for Workflows, mostly because I enjoy working on that project so much. As a result it took me longer to get acquainted with CD, but once I did  I began working on redesigning the Project settings page. Alex M, Jesse and I had explored different issues I could work on and we settled on this because it was a larger project that allows for some creative freedom, and it has been needing a rework for some time. 

The principal issue with the old page was that settings got tacked on piecemeal to a long list of other settings, and over time it became unwieldy. Additionally, to edit these settings required digging into a separate menu, and it was overall confusing and not user friendly. With these things in mind I wanted to build something that was simple, well organized and straightforward. I’ll go ahead and demo what I came up with.

# LOOKING AHEAD

In the future, I want to improve upon the memoization feature by adding user defined cache entry expiration periods, additional persistence options, workflow spec level memoization, and additional UI enhancements to make it easier to find information about memoized workflows and nodes.

I also would like to further improve the workflows list view by adding grouped views and additional sorting options.

With regards to Argo CD, I also hope to apply the same design and usability improvements I made to the Projects settings summary page to the rest of the Project settings tabs.

And finally, when getting started, I remember the frustration I felt setting up my development environment. While much of this was due to my own inexperience with K8S, I feel that streamlining the onboarding process would be valuable especially given that we will soon have new engineers from RedHat working on the project, and the easier it is for community members to get started contributing, the more contributions we will have. I’m incredibly grateful that my mentor Simon spent a lot of time helping me get started, but better onboarding would mean freeing up engineers from spending hours getting people acquainted with the project. 

