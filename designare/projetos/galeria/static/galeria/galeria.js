function GaleriaAtivacao(argumentos){
    endereco = "/galeria/"+argumentos.execucao_id+"/nova/";
    $.ajax({
        type    : "POST",
        url     : endereco,
        data    : { 'csrfmiddlewaretoken' : document.info.csrfmiddlewaretoken.value },
        dataType: "json",
        encode  : true,

        beforeSend: function(){
            //do nothing :)
        },
        success: function(data){
            //Cria um log da data recebida no console
            console.log(data);
            //Verifica se a operação foi bem sucedida
            if(data.sucesso)
            {
                GaleriaInicializacao(argumentos.execucao_id);              
            }
        }
    });
}
function GaleriaInicializacao(execucao_id){
    $("#input-fotos-"+execucao_id).fileinput({
        language: "pt-BR",
        action: "./",
        uploadUrl: "/galeria/"+execucao_id+"/adicionar-imagem/",
        uploadAsync: true,
        showUpload: false,
        showRemove: false,
        showCancel: false,
        autoReplace: true,
        showBrowse: false,
        showDrag: false,
        showPreview: true,
        theme: 'fa',
        dropZoneEnabled: true,
        browseOnZoneClick: true,
        previewClass: "border-square",
        captionClass: "hidden",
        layoutTemplates: {
                progress : "",
                actions: '<div class="file-actions">\n' +
                        '    <div class="file-footer-buttons">\n' +
                        '        {delete} {other}' +
                        '    </div>\n' +
                        '    <div class="clearfix"></div>\n' +
                        '</div>',
                actionDelete: '<button type="button" class="kv-file-remove btn btn-secondary border-square" title="{removeTitle}"{dataUrl}{dataKey}>{removeIcon}</button>\n',
        },
        fileTypeSettings: ['image'],
            uploadExtraData : function (previewId){
            var out = {}, key, desc;
            key = 'csrfmiddlewaretoken';
            out[key] = document.info.csrfmiddlewaretoken.value
            return out;
        }
    });
    $("#input-fotos-"+execucao_id).on('filebatchpreupload', function(event, data, previewId, index) {
        $("#btn-galeria-"+execucao_id+"-upload").tooltip('dispose');
        $("#btn-galeria-"+execucao_id+"-upload").html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
        $("#btn-galeria-"+execucao_id+"-upload").attr('disabled',true);
        $("#btn-galeria-"+execucao_id+"-cancelar").attr('disabled',true);
    });
    $('#input-fotos-'+execucao_id).on('fileuploaded', function(event, data, previewId, index) {
        console.log(data.response);
        $('#galeria-'+execucao_id).append(data.response.template);
    });
    $('#input-fotos-'+execucao_id).on('filebatchuploadcomplete', function(event, data, previewId, index) {
        $('#input-fotos-'+execucao_id).fileinput('clear').fileinput('enable');
        $("#btn-galeria-"+execucao_id+"-upload").html('<i class="fa fa-upload"></i>');
        $("#btn-galeria-"+execucao_id+"-upload").attr('disabled',false);
        $("#btn-galeria-"+execucao_id+"-cancelar").attr('disabled',false);
        $('#galeria-input-'+execucao_id).collapse('hide');
        $('#galeria-'+execucao_id+'-toolbar-upload').collapse('hide');
        $('#galeria-'+execucao_id+'-toolbar-exibicao').collapse('show');
    });
}
function GaleriaAdicionarImagem(execucao_id){
    $('#galeria-input-'+execucao_id).collapse('show');
    $('#galeria-'+execucao_id+'-toolbar-exibicao').collapse('hide');    
    $('#galeria-'+execucao_id+'-toolbar-upload').collapse('show');
}
function GaleriaCancelar(execucao_id){
    $('#galeria-input-'+execucao_id).collapse('hide');
    $('#galeria-'+execucao_id+'-toolbar-upload').collapse('hide');
    $('#galeria-'+execucao_id+'-toolbar-exibicao').collapse('show');    
}
function GaleriaUploadImagem(execucao_id){
    var count = $('#input-fotos-'+execucao_id).fileinput('getFilesCount');
    if(count != 0){
        $("#input-fotos-"+execucao_id).fileinput('upload').fileinput('disable');
    }
}