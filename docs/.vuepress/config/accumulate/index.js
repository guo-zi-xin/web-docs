const JSChildren = require('./files/javascript')
const GitChildren = require('./files/git')
const CSSChildren = require('./files/css')
const ES6Children = require('./files/es6')
const VueChildren = require('./files/Vue')
const ReactChildren = require('./files/React')
const YearChildren = require('./files/Year')
const JestChildren = require('./files/jest')
const NodeChildren = require('./files/nodeJS')

const JSRouter = {
    title: 'JS', 
    path: '/accumulate/JS/',
    collapsable: true,
    children: JSChildren
}

const CSSRouter = {
    title: 'CSS', 
    path: '/accumulate/CSS/',
    collapsable: true,
    children: CSSChildren,
}

const GitRouter = {
  title: 'Git相关', 
  path: '/accumulate/Git/',
  collapsable: true,
  children: GitChildren
}
const Es6Router = {
  title: 'ES6相关', 
  path: '/accumulate/ES6/',
  collapsable: true,
  children: ES6Children
}

const VueRouter = {
  title: 'Vue', 
  path: '/accumulate/Vue/',
  collapsable: true,
  children: VueChildren
}

const ReactRouter = {
  title: 'React', 
  path: '/accumulate/React/',
  collapsable: true,
  children: ReactChildren
}

const YearRouter = {
  title: '年度总结', 
  path: '/accumulate/Year/',
  collapsable: true,
  children: YearChildren
}

const JestRouter = {
  title: 'Jest单元测试', 
  path: '/accumulate/Jest/',
  collapsable: true,
  children: JestChildren
}

const NodeRouter = {
  title: 'Node', 
  path: '/accumulate/Node/',
  collapsable: true,
  children: NodeChildren
}

module.exports = [
  JSRouter,
  CSSRouter,
  GitRouter,
  // Es6Router,
  // VueRouter,
  // ReactRouter,
  // JestRouter,
  NodeRouter,
  YearRouter
]