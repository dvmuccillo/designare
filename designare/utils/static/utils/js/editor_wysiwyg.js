;Designare.Utils.Editor_WYSIWYG = {
    ActivateAll         : function () {
        $('div[data-toggle="bootstrap-wysiwyg"]').each(function(index,value){
            var editor_id = $(this).attr('id');
            $(this).wysiwyg({ toolbarSelector: "[data-role='"+editor_id+"-toolbar']" });
        });
    }
};