<!-- Available at https://breeze.software/research/CSCI640 -->

# Comparing Performance of Multithreaded Applications in a Docker Virtualized Environment to a Native One

## Introduction

I aim to address the following: how much, if at all, does containerizing a multithreaded application impact its performance? I hypothesize that a Dockerized program will run significantly slower than a native version of the same application, due to the additional overhead required to virtualize the kernel. 

## Methods

Testing was done on a 2016 15" MacBook Pro with a 2.7 GHz Quad-Core Intel Core i7 and 16 GB of RAM, running MacOS Big Sur. As this was not an isolated environment, it is likely that these tests are not as consistent as those run on a dedicated machine or cloud server. This was accounted for with additional test runs, to average out the noise on the machine.

I tested 3 algorithms: merge sort, matrix multiplication, and a Monte Carlo calculation of Pi. I wrote each of these algorithms in both Go and C++. 

I adapted C++ implementations of the algorithms from the following sources: 
- Matrix Multiplication: https://www.geeksforgeeks.org/multiplication-of-matrix-using-threads/
- Merge Sort: https://www.geeksforgeeks.org/merge-sort-using-multi-threading/
- Monte Carlo Pi Calculation: https://github.com/michaelballantyne/montecarlo-pi/blob/master/pi.c

I used the [Google Benchmark](https://github.com/google/benchmark) library to time the C++ tests, and the native Go testing package to time the Go tests. Both of these packages automatically run benchmarks a variable number of times depending on runtime to achieve acceptible error.

For Matrix Multiplication, I tested C++ for matrices of size 64x64 up to 1024x1024 and Go for sizes of 8x8 up to 1024x1024.
For Merge Sort, I used array sizes of 4096 up to 4194304 elements for both C++ and Go.
For the Pi Calculation, I calculated using 262144 points up to 67108864 (4^24) points for both C++ and Go.

## Results and Analysis

Click [here](./CSCI640-data.pdf) for a PDF with all results and charts.

In every case, my testing confirmed my hypothesis that Dockerizing the programs would negatively impact their performance. However, the margin with which this occured varied greatly. 

The Pi calculation showed a small (about 6-7%) performance hit on Docker compared to native in Go, and a much larger (as much as 72%) performance hit in C++. For both languages, however, the performance difference stayed relatively constant (of the same order of magnitude) as the calculation size increased. I posit that this is explained by the existence of a constant overhead for each operation in Docker.

This theory begins to falter, however, when looking at the Matrix Multiplication results. In C++, the relative runtime differential for Docker decreases greatly with input size; at small input sizes, it is as much as 75% but it decreases rapidly to hover around 0%. To further confuse matters, in Go, this pattern is reversed as the differential starts at <10% for the smallest inputs and increases to over 100%. The C++ result may be explained by an intial setup cost that takes up a proportionately smaller share of the runtime as that runtime increases.

When looking at the Merge Sort algorithm results, things become more clear. In Go, the Docker runtime differential is negatively correlated with input size, but linearly; in C++ the performance differential is large but relatively constant (that is, of the same order of magnitude) at about 150%. I suspect that the Go result is because for merge sort, there is probably a large amount of constant extra overhead, so as runtime increases this takes up a smaller percentage of it -- similar to what was seen for the C++ implementation of Matrix Multiplication. In C++ merge sort, this initial overhead perhaps doesn't exist for merge sort.

To summarize, Dockerizing an application results in a significant performance penalty. The severity of this penalty appears to be variable depending on the algorithm, but constant for each operation. However, there appears to be an additional  performance hit for certain algorithms that is constant regardless of the number of operations.

## Learnings

I learned a great deal about modern C++ development, automating testing, and creating efficient Docker containers through this project. I have virtually no "real world" C++ development experience, so learning `cmake` was interesting and informative. I also spent a great deal of time automating the process of running my algorithms at different input sizes, and a large part of this was creating a Docker image that runs each algorithm and stores the timing results.
