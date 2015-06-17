$(function() {
	// Hide unnecessary div for DTM
	$("#normalize-options").hide();

	// Disable dtm toggle when matrix
	if (matrixExist === 0){
		$(".toggle-dtm").unbind("click")
						.css("background-color", "gray");
	}

	// display/hide expandable divs (Define Groups div) here
	$(".groupOption-div").click(function() {
		$choice = $(".show-options div").siblings('input');
		$.each($choice, function(){
			if ($(this).is(':checked')) {
				$(this).siblings('div').show();
			} else
				$(this).siblings('div').hide();
		});
	});

	// Display a new div based on choosing proportional Z-test or not
	$(".testMethod-div").click(function() {
		if ($("#pz").is(':checked')){
			$(".test-input-div").removeClass("hidden");
		}else {
			$(".test-input-div").addClass("hidden");
		}
	});

	// Dynamically change the upper and lower bounds based on user inputs (Proportional Counts)
	$("#upperboundPC").click(function() {
		$(this).context.min = $("#lowerboundPC").val();
		$("#upperboundRC, #lowerboundRC").val(0);
	});

	$("#lowerboundPC").click(function() {
		$(this).context.max = $("#upperboundPC").val();
		$("#upperboundRC, #lowerboundRC").val(0);
	});

	// Reset proportional counts input fields while raw counts is chosed
	$("#upperboundRC, #lowerboundRC").click(function() {
		$("#upperboundPC, #lowerboundPC").val(0);
	});

	// Handle exceptions before submitting the form
	$("form").submit(function() {
		if ($("#upperboundRC").val() < $("#lowerboundRC").val()) {
			$('#error-message').text("Lower bounds exceeds upper bounds!");
			$('#error-message').show().fadeOut(1500);
			return false;
		}
	});
	
	function updateTokenizeCheckbox() {
		$('input[type=radio][name=normalizeType]').attr('disabled', 'true');
		$('input[type=radio][name=normalizeType]').parent('label').addClass('disabled');
	}

	updateTokenizeCheckbox();

});
