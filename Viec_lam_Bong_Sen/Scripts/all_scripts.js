//All Scripts

$(document).ready(function(){
						   
//Nivo Slider
	$('#slider').nivoSlider();
	
//Slim Scroll
	$('.scrollbar').slimscroll({
        height: 'auto'
      });

//JS Tooltip
$('.parentLink').mouseover(function() {
            if ($(this).data("qtip")) $(this).qtip("destroy");
            var _text = $(this).next('.fields_child').html();
            $(this).qtip({
                content: {
                    text: _text,
                    title: {
                        text: $(this).attr('data-value'),
                        button: '<img src="Images/icons.gif" />'
                    }
                },
                position: {
                    corner: {
                        tooltip: 'leftMiddle',
                        target: 'rightMiddle'
                    }
                },
                show: {
                    when: false,
                    ready: true
                },
                hide: { when: 'mouseout', fixed: true, delay: 500 },
                style: {
                    padding: 10,
                    textAlign: 'center',
                    tip: true,
                    name: 'cream'
                }
            });
        });

        function addText(e) {
            var u = $(e).next('.fields_child').html();
        }
		
});