# webpack5 主要升级点

- **持久缓存(Persistent Caching)**

  webpack5 引入了 更好的持久缓存机制， 利用了更稳定的HashedModuleldsPlugin和 NamedChunksPlugin， 以改善构建性能。

- **Tree-Shaking改进**

  webpack5 对Tree-Shaking进行了改进， 提供了更好的代码优化，以便删除未使用的代码。

- **支持WebAssembly(WASM)**

  webpack5 对 WebAssembly提供了原生的支持，使得在项目中使用WebAssembly更加方便。

- **支持ES6模块导入(Dynamic Import)**

  Webpack5对动态导入语法(import()) 提供了更好的支持，可以更轻松地使用代码分割。

- **模块联邦(Module Fedration)**

  这是Webpack5的一项重大功能，允许多个独立的webpack构建连接在一起，实现模块共享， 从而更好地支持微服务架构。

- **缓存组(Caching Groups)**

  新的缓存组概念被引入，可以更细粒度地控制模块的缓存策略。

- **内置代码分割优化(optimization.splitChunks)**

  webpack5 通过 optimization.splitChunks进行了重新设计，提供了灵活的选项，是的代码分割更为强大和易用。

- **默认配置优化**

  Webpack5 默认配置中的一些优化，使得开箱即用的性能更好。

- **提高构建性能**

  Webpack引入了一些性能优化，包括更快地持久化缓存，更快地构建速度等。

- **移除废弃特性**

  做未更新， webpack移除了一些过时的特性和API，因此再升级时需要注意潜在的破坏性变化。
