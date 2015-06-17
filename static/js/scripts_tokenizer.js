$(function() {

	// Handle exceptions when buttons are clicked
	$('#csvdownload, #csvgen').click(function() {

		$("#loading-div").css({"visibility": "visible", "z-index": "400000"});
		var activeFiles = $('.filenames').length;
		if (activeFiles < 1) {
			$("#csvsubmiterrormessage1").show().fadeOut(3000,"easeInOutCubic");
			return false;
		}
		return true;
	});

	function updateCSVcontentOption() {
		if ( $("#greyword").is(':checked') || $("#culling").is(":checked") || $("#MFW").is(":checked") ) {
			$("#csvcontdiv").show();
		}
		else {
			$("#csvcontdiv").hide();
		}
	}

	updateCSVcontentOption();

	$("#greyword").click(updateCSVcontentOption);
	$("#culling").click(updateCSVcontentOption);
	$("#MFW").click(updateCSVcontentOption);

});
