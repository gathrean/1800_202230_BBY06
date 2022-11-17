//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton(){
    console.log($('#navbarPlaceholder').load('/info/nav.html'));
    console.log($('#navbar0Placeholder').load('/info/nav0.html'));
    console.log($('#footerPlaceholder').load('/info/footer.html'));
    console.log($('#task-manager').load('/run/run-tasks.html'));
}
loadSkeleton();  //invoke the function
