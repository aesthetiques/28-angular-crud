'use strict'

const path = require('path')
const camelcase = require('camelcase')
const pascalcase = require('pascalcase')
const angular = require('angular')
require('@uirouter/angularjs')
//create angular module and inject dependencies

//create angular module and inject dependencies. this exposes all of the components that are a part of this.
const demoApp = angular.module('demoApp', ['ui.router'])

//load configurations
let context = require.context('./config/', true, /\.js$/)
context.keys().forEach(path => demoApp.config(context(path)))

//load views
context = require.context('./view/', true, /\.js$/)//first arg dir, then boolean of whether to look for subdir, then look for file ext
context.keys().forEach(key => demoApp.controller(pascalcase(path.basename(key, '.js')), context(key)))

//load services
context = require.context('./service/', true, /\.js$/)
context.keys().forEach(key => demoApp.service(camelcase(path.basename(key, '.js')), context(key)))

//load filters

//load components
context = require.context('./component/', true, /\.js$/)//first arg dir, then boolean of whether to look for subdir, then look for file ext
context.keys().forEach(key => demoApp.component(camelcase(path.basename(key, '.js')), context(key)))