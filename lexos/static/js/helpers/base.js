$("document").ready(function(){
    highlight_navbar_button();
    initialize_dropdown_menus();
    update_active_document_count();

    // If the "Help" button is pressed, toggle the help section visibility
    $("#help-button").click(toggle_help_section);

    // Fade the page content in
    $("main").css("opacity", "1");

    // If the "Active Documents" text is clicked, go to the "Manage" page
    $("#active-documents-text").click(function(){

    });
});


/**
 * Highlights the appropriate navbar button for the current page.
 */
function highlight_navbar_button(){

    switch(window.location.pathname.substring(1)){

        // "Upload"
        case "upload": highlight($("#upload-button")); break;

        // "Manage"
        case "manage": highlight($("#manage-button")); break;

        // "Prepare"
        case "scrub": case "cut": case "tokenize":
            highlight($("#prepare-button")); break;

        // "Visualize"
        case "word-cloud": case "multicloud": case "bubbleviz": case "rolling-window":
            highlight($("#visualize-button")); break;

        // "Analyze"
        case "statistics": case "dendrogram": case "k-means": case "consensus-tree":
        case "similarity": case "top-words": case "content-analysis":
            highlight($("#analyze-button"));
    }
}


/**
 * Highlights the given element.
 * @param {jQuery} element: The element to highlight.
 */
function highlight(element){
    element.css("color", "#47BCFF");
}


/**
 * Initializes the navbar dropdown menus.
 */
function initialize_dropdown_menus(){

    // "Prepare"
    add_dropdown_menu_callback("prepare", [
        ["Scrub", "scrub"],
        ["Cut", "cut"],
        ["Tokenize", "tokenize"]
    ]);

    // "Visualize"
    add_dropdown_menu_callback("visualize", [
        ["Word Cloud", "word-cloud"],
        ["Multicloud", "multicloud"],
        ["BubbleViz", "bubbleviz"],
        ["Rolling Window", "rolling-window"]
    ]);

    // "Analyze"
    add_dropdown_menu_callback("analyze", [
        ["Statistics", "statistics"],
        ["Dendrogram", "dendrogram"],
        ["K-Means", "k-means"],
        ["Consensus Tree", "consensus-tree"],
        ["Similarity Query", "similarity-query"],
        ["Top Words", "top-words"],
        ["Content Analysis", "content-analysis"]
    ]);

    // Remove the menu if an outside element was clicked
    $(window).click(remove_dropdown_menus);

    // Stop click propagation on navbar menu button clicks so that the menu
    // is not removed undesirably
    $(".navbar-button").each(function(){
       $(this).click(function(event){ event.stopPropagation(); });
    });
}


/**
 * Adds a click callback to toggle the dropdown menu.
 * @param {string} element_name: The name of the navbar elements.
 * @param {list} items: The names and links of the dropdown rows.
 */
function add_dropdown_menu_callback(element_name, items){
    $(`#${element_name}-button`).click(function(){

        let create = !$(`#${element_name}-menu`).length;

        //If any dropdown menus exist, remove them
        remove_dropdown_menus();

        //If the menu does not exist, create it
        if(create){

            // Create the dropdown menu grid
            let menu = $(`<div id="${element_name}-menu" class=`+
                `"navbar-menu"></div>`).insertBefore(
                `#${element_name}-button`);

            // Populate the grid
            for(const item of items){
                let title = item[0];
                let url = item[1];
                $(`<a href="${url}">${title}</a>`).appendTo(menu);
            }

            // Stop click propagation if the menu is clicked
            menu.click(function(event){ event.stopPropagation(); });
        }
    });
}


/**
 * Removes any dropdown menus.
 */
function remove_dropdown_menus(){
    let dropdown_menus = $(".navbar-menu");
    if(dropdown_menus.length)
        dropdown_menus.each(function(){ $(this).remove(); });
}


/**
 * Toggles the visibility of the help section.
 */
let help_visible = false;
function toggle_help_section(){
    let main_grid = $("#main-grid");
    let help_button = $("#help-button");

    // If the help section is visible, close it
    if(help_visible){
        main_grid.css("grid-template-columns", "100%");
        $("#help-section").remove();
        help_button.removeClass("highlight");
        help_visible = false;
        return;
    }

    // Otherwise, show the help section
    main_grid.css("grid-template-columns", "40rem auto");

    $(`
        <div id="help-section">
            <div id="help-section-navbar">
                <span id="help-button-header" class="button help-button">Help</span>
                <span id="about-button" class="button help-button">About Lexos</span>
                <span id="glossary-button" class="button help-button">Glossary</span>
            </div>
            <div id="help-section-content"></div>
        </div>
    `).prependTo(main_grid);

    help_button.addClass("highlight");

    help_visible = true;
    let help_content_element = $("#help-section-content");
    help_content_element.load("/static/help"+window.location.pathname+"-help.html");

    $("#glossary-button").click(function(){
        help_content_element.load("/static/help/glossary-help.html");
    });

    $("#about-button").click(function(){
        help_content_element.load("/static/help/about-help.html");
    });

    $("#help-button-header").click(function(){
        help_content_element.load("/static/help"+window.location.pathname+"-help.html");
    });
}

/**
 * Update the number of active documents displayed after the "Active
 * Documents" text in the footer
 */
let active_document_count;
function update_active_document_count(){

    return $.ajax({type: "GET", url: "active-documents"})
        .done(function(response){
            active_document_count = parseInt(response);
            $("#active-document-count").text(response);
        })

    .fail(function(){ error("Failed to update the active document count."); });
}