import hashlib
import base64

def get_hash(word,size=5):
    md5 = hashlib.md5(word).digest()
    local_hash = base64.standard_b64encode(md5)
    result = local_hash.encode('hex').upper()[0:size]  
    
    return result

#def salvar_e_gerar_codigo(chamada,tamanho):
#    try:
#        chamada.codigo_rastreio = gerar_hash(palavra=chamada.dt_abertura.__str__(),tamanho=tamanho)
#        chamada.save()
#    except IntegrityError:
#        salvar_e_gerar_codigo(chamada,tamanho+1)