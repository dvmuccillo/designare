from django.db import models
import json, os, io

# Create your models here.
class AssetsManager(object):

    BOWER_COMPONENTS_DIR = ""

    css = []
    js = []
    bower_components = []
    plugins = []

    def registerBower(self,package):
        if package not in self.bower_components:
            self.bower_components.append(package)
            main_files = self.loadBowerPackageProperties(package)['main']
            package_dir = os.path.join(self.BOWER_COMPONENTS_DIR,package)
            self.allocateAssets(package_dir,main_files)

    def registerPlugin(self,package):
        if package not in plugins:
            self.plugins.append(package)
            #do more things here

    def loadProperties(self,path_to_json_file):
        with io.open(path_to_json_file) as json_file:
            properties = json.load(json_file)
        return properties

    def loadBowerPackageProperties(self,package):
        path_to_json_file = os.path.join(self.BOWER_COMPONENTS_DIR,(os.path.join(package,"bower.json")))
        return loadProperties(path_to_json_file)
        
    def allocateAssets(self,assets_base_dir,assets_list):
        for asset in assets_list:
            if asset.lower.endswith('.js'):
                self.js.append(assets_base_dir + asset)
                continue
            if asset.lower.endswith('.css'):
                self.css.append(assets_base_dir + asset)
        