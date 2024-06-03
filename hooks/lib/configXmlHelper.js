/*
Helper class to read data from config.xml file.
*/
var path = require('path');
var xmlHelper = require('./xmlHelper.js');

const { ConfigParser } = require('cordova-common');

var ANDROID = 'android';
var IOS = 'ios';
var CONFIG_FILE_NAME = 'config.xml';

module.exports = ConfigXmlHelper;

// region public API

/**
 * Constructor.
 *
 * @param {Object} cordovaContext - cordova context object
 */
function ConfigXmlHelper(ctx) {
  this.configFilePath = path.join(ctx.opts.projectRoot, CONFIG_FILE_NAME);
  this.configFile = new ConfigParser(this.configFilePath);
}

/**
 * Read config.xml data as JSON object.
 *
 * @return {Object} JSON object with data from config.xml
 */
ConfigXmlHelper.prototype.read = function() {
  return xmlHelper.readXmlAsJson(this.configFilePath);
}

/**
 * Get package name for the application. Depends on the platform.
 *
 * @param {String} platform - 'ios' or 'android'; for what platform we need a package name
 * @return {String} package/bundle name
 */
ConfigXmlHelper.prototype.getPackageName = function(platform) {
  var packageName;

  switch (platform) {
    case ANDROID:
        packageName = this.configFile.android_packageName();
        break;
    case IOS:
        packageName = this.configFile.ios_CFBundleIdentifier();
        break;
  }
  if (packageName === undefined || packageName.length == 0) {
    packageName = this.configFile.packageName();
  }

  return packageName;
}

/**
 * Get name of the current project.
 *
 * @return {String} name of the project
 */
ConfigXmlHelper.prototype.getProjectName = function() {
  return this.configFile.name();
}

// endregion