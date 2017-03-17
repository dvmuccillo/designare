import hashlib

def get_hash(word,size=5):
    md5 = hashlib.md5()
    md5.update(word.encode('utf-8')) 
    result = md5.hexdigest().upper()[0:size]
    return result