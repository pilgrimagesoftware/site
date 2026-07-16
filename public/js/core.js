
var currentSection = 'products-section';

function showProducts() {
$('#productlist').fadeIn('fast');
}

function hideProducts() {
$('#productlist').fadeOut('slow');
}

function showSection(newSection) {
$('#'+currentSection).slideUp('slow', function() {
currentSection = newSection;
$('#'+newSection).slideDown('slow');
});
}