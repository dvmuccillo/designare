from django.db import models
import json, os, io

# Create your models here.
class AssetsManager(object):
    APP_BASE_DIR = os.path.join(os.getcwd(),'assets')
    BOWER_COMPONENTS_DIR = "/static/assets/bower_components/"
    BOWER_OVERRIDE = {}
    CACHED_JSON = {}

    css = []
    js = []
    bower_components = []
    plugins = []

    def __init__(self):
        path_to_json_file = os.path.join(self.APP_BASE_DIR + "/static/assets/bower.json")
        self.BOWER_OVERRIDE = self.loadProperties(path_to_json_file)['overrides']        

    def loadProperties(self,path_to_json_file):
        if path_to_json_file in self.CACHED_JSON:
            #print ('in cache ' + path_to_json_file +'\n')
            properties = self.CACHED_JSON[path_to_json_file]
        else:
            #print ('loading ' + path_to_json_file +'\n')
            with io.open(path_to_json_file) as json_file:
                properties = json.load(json_file)
                self.CACHED_JSON[path_to_json_file] = properties
        return properties

    def loadBowerPackageProperties(self,package):
        path_to_json_file = os.path.join(self.APP_BASE_DIR + self.BOWER_COMPONENTS_DIR + package + '/bower.json')
        return self.loadProperties(path_to_json_file)
        
    def registerBower(self,package):
        if package not in self.bower_components:
            self.bower_components.append(package)
            try:
                properties = self.loadBowerPackageProperties(package)
            except FileNotFoundError:
                properties = self.BOWER_OVERRIDE[package]
            if 'dependencies' in properties:
                for dependencie in properties['dependencies']:
                    self.registerBower(dependencie)
            package_dir = self.BOWER_COMPONENTS_DIR + package
            if package in self.BOWER_OVERRIDE:
                properties['main'] = self.BOWER_OVERRIDE[package]['main']
            self.allocateAssets(package_dir + "/",properties['main'])


    """def registerPlugin(self,package):
        if package not in plugins:
            self.plugins.append(package)
            #do more things here"""

    def allocateAssets(self,assets_base_dir,assets_list):
        if type(assets_list) is str:
            assets_list = [assets_list]
        for asset in assets_list:
            if asset.lower().endswith('.js'):
                self.js.append(assets_base_dir + asset)
                continue
            if asset.lower().endswith('.css'):
                self.css.append(assets_base_dir + asset)

    def getCssLinks(self):
        css_links = '<!-- Links gerados com o Assets Manager -->\n'
        if type(self.css) is str:
            self.css = [self.css]
        for link in self.css:
            css_links += "<link rel='stylesheet' href='"+link+"'>\n"
        return css_links

    def getJsLinks(self):
        js_links = '<!-- Links gerados com o Assets Manager -->\n'
        if type(self.js) is str:
            self.js = [self.js]
        for link in self.js:
            js_links += "<script src='"+link+"'></script>\n"
        return js_links

    def clearAll(self):
        self.bower_components = []
        self.css = []
        self.js = []
        return ""