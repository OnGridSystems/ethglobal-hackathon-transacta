# Transacta - Unified Cross-ZK NFT bridge and metadata relayer

Bridge your NFTs with ease, [OnGrid](https://ongrid.pro/)'s cross-chain expertise!

## About

It can be challenging to transfer NFTs across zk-EVM Layer-2 networks due to different approaches and/or difference in interfaces. We have taken a step towards eliminating these barriers and removing friction by building a one-stop application for dispatching cross-chain transfers.

* Transacta leverages the cross-chain messaging capabilities and bridging solutions currently available to transfer tokens between different networks. It can be considered a **bridge aggregator** that also offers features specifically designed for NFTs.
* In addition to EVM states bridging (tokenIDs, balances), transacta synchronizes NFT metadata and makes it available for Polybase clients.

## Features

### NFT Bridge

Transacta operates between the following chains:
* [Goerli](https://goerli.net/) testnet - acting as a main network for the NFT asset
* [Scroll](https://scroll.io/) testnet - EVM-compatible zero-knowledge rollup
* [Polygon zkEVM](https://wiki.polygon.technology/docs/zkEVM/develop/) testnet - L2 zero-knowledge sidechain
* [zkSync Era](https://zksync.io/) - Layer 2 zkEVM

For the MVP presented on [ETHGlobal Scaling Ethereum Hackathon](https://ethglobal.com/events/scaling2023) we plan to support the most common standard - ERC721 with JSON metadata.

### NFT metadata relayer

NFT metadata relayer mirrors initial metadata stored using HTTPs webservice or IPFS endpoint to decentralized [Polybase db](https://polybase.xyz/) collection:
* NFT get periodically checked for URI changes
* JSON URI gets fetched by HTTPs, its image gets downloaded, traits get parsed and decoded
* Image gets uploaded to the Polybase
* Traits and Polybase image identifier get saved to the Polybase collection
* The process repeats

## Technical design

* The project has been built using the Django web framework, which is a popular Python-based tool for building web applications. For building RESTful APIs, the Django Rest Framework (DRF) has been utilized to simplify the process of building APIs and make them more modular and scalable.

* For fetching events history we use [TheGraph engine](https://thegraph.com/en/) that collects token transfers and provides graphQL endpoint used by Frontend

* The frontend DApp has been built with ReactJS, a widely-used JavaScript library for building user interfaces. This enables the application to provide a more responsive, dynamic and interactive user experience. 

* Additionally, background workers (indexers and relayers) has been implemented in Python for EVM and Pythonic web3 client library. Polybase engine uses NodeJS and polybase client.

Overall, this technology stack provides a solid foundation for building a scalable, performant and user-friendly web application.

![image](https://user-images.githubusercontent.com/7992612/227772379-e633f363-86ec-4dbd-97a1-d21c0fd9ceed.png)


# License

[MIT License](LICENSE)

Copyright (c) 2023 OnGrid Systems
