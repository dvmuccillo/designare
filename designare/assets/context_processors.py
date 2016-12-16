from models import AssetsManager

def assets_manager(request):
    assets_manager = AssetsManager()
    return {'DESIGNARE_ASSETS_MANAGER':assets_manager}