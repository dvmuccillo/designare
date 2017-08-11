from django.db import models
import json, os, io

# Create your models here.
class AssetsManager(object):
    APP_BASE_DIR = os.path.join(os.getcwd(),'assets')
    BOWER_COMPONENTS_DIR = "/static/assets/bower_components/"
    BOWER_OVERRIDE = {}
    CACHED_JSON = {}
    JS_NAMESPACES = {}

    css = []
    js = []
    bower_components = []
    namespaces = []
    plugins = []

    def __init__(self):
        path_to_json_file = os.path.join(self.APP_BASE_DIR + "/static/assets/bower.json")
        self.BOWER_OVERRIDE = self.loadProperties(path_to_json_file)['overrides']        

    def loadProperties(self,path_to_json_file):
        if path_to_json_file in self.CACHED_JSON:
            properties = self.CACHED_JSON[path_to_json_file]
        else:
            with io.open(path_to_json_file) as json_file:
                properties = json.load(json_file)
                self.CACHED_JSON[path_to_json_file] = properties
        return properties

    def loadBowerPackageProperties(self,package):
        try:
            path_to_json_file = os.path.join(self.APP_BASE_DIR + self.BOWER_COMPONENTS_DIR + package + '/bower.json')
            properties = self.loadProperties(path_to_json_file)
        except FileNotFoundError:
            try:
                path_to_json_file = os.path.join(self.APP_BASE_DIR + self.BOWER_COMPONENTS_DIR + package + '/.bower.json')
                properties = self.loadProperties(path_to_json_file)
            except:
                raise
        return properties

    def registerBower(self,package):
        if package not in self.bower_components:
            self.bower_components.append(package)
            try:
                properties = self.loadBowerPackageProperties(package)
            except FileNotFoundError:
                properties = self.BOWER_OVERRIDE[package]
            if 'dependencies' in properties:
                for dependency in properties['dependencies']:
                    self.registerBower(dependency)
            package_dir = self.BOWER_COMPONENTS_DIR + package
            if package in self.BOWER_OVERRIDE:
                properties['main'] = self.BOWER_OVERRIDE[package]['main']
            self.allocateAssets(package_dir + "/",properties['main'])

    def registerNamespace(self,namespace):
        if namespace not in self.namespaces:
            self.namespaces.append(namespace)
            if namespace in self.JS_NAMESPACES:
                browser_path = self.JS_NAMESPACES[namespace]
            else:
                file_path = ""
                words = namespace.lower().split('.')
                app = words.pop(0)
                if app == 'designare':
                    app = words.pop(0)
                if len(words) > 1:
                    for word in words:
                        file_path = file_path + "/" + word
                else:
                    file_path = words.pop()
                browser_path = "/static/" +app + "/js/" + file_path + ".js"
                self.JS_NAMESPACES[namespace] = browser_path
            self.js.append(browser_path)
        
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
        self.namespaces = []
        self.css = []
        self.js = []
        return ""