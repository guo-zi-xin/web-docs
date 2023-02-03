const JSChildren = require('./JS')
const GitChildren = require('./Git')
const CSSChildren = require('./CSS')
const ES6Children = require('./Es6')
const VueChildren = require('./Vue')
const ReactChildren = require('./React')
const YearChildren = require('./Year')
const JestChildren = require('./Jest')
const NodeChildren = require('./Node')

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