var brandlist = new Array("Porsche","Volkswagen","Audi","BMW");

var count = 0;

var clients_served = 0;
var cars_sold = 0;
var amount = 0;
var brandcost = new Array(72500, 23930, 31260, 43990);

	var questions = [
	{
		"qns":"Where is the Porsche headquarters located?",
		"no":"1",
		"correctAns":"d",
		"points":"2",
		"category":"Porsche",
		"choices" : [{
						"title":"China",
						"no":"a"
				},
				{
						"title":"Singapore",
						"no":"b"
				},
				{
						"title":"America",
						"no":"c"
				},
				{
						"title":"Germany",
						"no":"d"
				}
			]
		},
		{
		"qns":"What is the revenue for Porsche in 2020?",
		"no":"2",
		"correctAns":"a",
		"points":"2",
		"category":"Porsche",
		"choices" : [{
						"title":"28 billion",
						"no":"a"
				},
				{
						"title":"44 billion",
						"no":"b"
				},
				{
						"title":"10 billion",
						"no":"c"
				},
				{
						"title":"19 billion",
						"no":"d"
				}
			]
		},
		{
		"qns":"Where is the Volkswagen headquarters located?",
		"no":"1",
		"correctAns":"d",
		"points":"2",
		"category":"Volkswagen",
		"choices" : [{
						"title":"China",
						"no":"a"
				},
				{
						"title":"Singapore",
						"no":"b"
				},
				{
						"title":"America",
						"no":"c"
				},
				{
						"title":"Germany",
						"no":"d"
				}
			]
		},
		{
		"qns":"Where is the Audi headquarters located?",
		"no":"1",
		"correctAns":"d",
		"points":"2",
		"category":"Audi",
		"choices" : [{
						"title":"China",
						"no":"a"
				},
				{
						"title":"Singapore",
						"no":"b"
				},
				{
						"title":"America",
						"no":"c"
				},
				{
						"title":"Germany",
						"no":"d"
				}
			]
		},
		{
		"qns":"Where is the BMW headquarters located?",
		"no":"1",
		"correctAns":"d",
		"points":"2",
		"category":"BMW",
		"choices" : [{
						"title":"China",
						"no":"a"
				},
				{
						"title":"Singapore",
						"no":"b"
				},
				{
						"title":"America",
						"no":"c"
				},
				{
						"title":"Germany",
						"no":"d"
				}
			]
		}
	];


var qnsIndex = 0;
var selections =[];
var currentClient = null;

function newClient(){
	var preference = Math.floor((Math.random()*4));
	var time = Math.floor((Math.random()*10000)+1);
	var client = Math.floor((Math.random()*10)+1);
	if(count < 5) {
		var brandName = brandlist[preference];
		$("#clients_queue").append('<div class="client client_'+client+ ' choice_' + brandName + '"><span class="preference">Client for '+brandlist[preference]+'</span></div>');
		count++;

		
		
		var $clients = $("#clients_queue .client");
		var firstClient = $clients[0];
		var $firstClient = $(firstClient);
		var clientDragOption = {
				revert : true,
				zIndex : 1
		};
		$firstClient.draggable(clientDragOption);
		}
	setTimeout(function(){newClient();},time);
}

function makeAllCarBrandsDroppable() {
	for(var i=0;i<brandlist.length;i++) {
		var brand = brandlist[i];
		makeCarBoxesDroppable(brand);
	}
}

function makeCarBoxesDroppable(brand) {
	var smallBrand = brand.toLowerCase();
	var $carBoxes = $("#" + smallBrand + " .car");
	var options = {
					accept:'.choice_' + brand,
					drop: function(e, ui) {
						var $dropBox = $(this);
						var $dragBox = $(ui.draggable);
						$dropBox.append($dragBox);
						$dragBox.position({of:$dropBox,my:'left top', at:'left top'});
						
						
						var removeMarginStyle = {
							"margin-top": '0px',
							"margin-bottom": '0px',
							"margin-left": "-3px"
						};
						$dragBox.css(removeMarginStyle);
						count--;
						$dragBox.addClass('selected');
						currentClient = $dragBox;
						next_qns(brand);
						var dialogOption = { scrolling: 'no' };
						$.fancybox.open('#mcq',dialogOption);
					}
				};
	$carBoxes.droppable(options);
}








function makeExitDroppable() {
	var $exit = $("#exit");
	var options = {
		accept: '.client',
		drop: function(e, ui) {
			var $dropBox = $(this);
			var $dragBox = $(ui.draggable);
			$dropBox.append($dragBox);
			$dragBox.position({of:$dropBox,my:'left top',at:'left top'});
			
			var alignCenterStyle = {
				"margin-top": '5px',
				"margin-bottom": '0px',
				"margin-left": "30px"
			};
			$dragBox.css(alignCenterStyle);
				if($dragBox.hasClass('selected') == false) {
					count--;
					newClient();
				}
			setTimeout(function() {
				removeBox($dragBox,-100);
				},
				2000	  		  
			);
		}
	};
	$exit.droppable(options);
}

function removeBox(element,moveToTop) {
	element.css('z-index', 3000);
	var option = {top:moveToTop,};
	element.animate(option)
		.fadeOut(function() {
			element.remove();
			}
		)
}

function makeCashierDroppable() {
	var $cashier = $("#cashier");
	var options = {
		accept:'.client.selected',
		drop: function(e, ui) {
			var $dropBox = $(this);
			var $dragBox = $(ui.draggable);
			$dropBox.append($dragBox);
			$dragBox.position({of:$dropBox,my:'left top',at:'left top'});
			
			var alignCenterStyle = {
				"margin-top": '30px',
				"margin-bottom": '0px',
				"margin-left": "40px"
			};
			$dragBox.css(alignCenterStyle);
			showCashierDialog($dragBox);
		}
	};
	$cashier.droppable(options);
}

function showCashierDialog(dragClient) {
	var option = {
		buttons: {
			"Yes": function() {
				clients_served += 1;
				cars_sold += 1;
				amount += calcost(dragClient);
				update();
				removeBox(dragClient, "-=210");
				$( this ).dialog( "close" );
			},
			"No and Exit": function() {
				removeBox(dragClient, "-=210");
				$( this ).dialog( "close" );
			}
		},
		close: function() {
			removeBox(dragClient, -350);
		}
	};
	var dialog = $('#dialog');
	dialog.dialog(option);
}


function calcost(dragClient) {
	if (dragClient.hasClass('choice_Porsche'))
		{
			return brandcost[0];
		}
	else if (dragClient.hasClass('choice_Volkswagen'))
		{
			return brandcost[1];
		}
	else if (dragClient.hasClass('choice_Audi'))
		{
			return brandcost[2];
		}
	else if (dragClient.hasClass('choice_BMW'))
		{
			return brandcost[3];
		}
}

function update() {
	$('#clients_served').text(clients_served + ' clients');
	$('#cars_sold').text(cars_sold + ' cars');
	$('#amount').text('$ ' + amount);
}
$(
	function() {
		makeAllCarBrandsDroppable();
		newClient();
		makeExitDroppable();
		makeCashierDroppable();
		showPage("splash");
	}
)

function showPage(id) {
	hideAllPages();
	var page = $("#" + id);
	var tweenEnd = {
					opacity: 1.0
					};
	page.animate(tweenEnd,1000);
	page.show();
}

function hideAllPages() {
	var pages = $(".page-panel")
	pages.each(function() {
			var currentPage = $(this);
			var hideStyle = {
				opacity: 0.0,
				visibility: "visible"
			};
			currentPage.css(hideStyle);
			currentPage.hide();
		}
	);
}

function next_qns(category) {
	var filteredQns = [];
	for (var i=0;i<questions.length;i++) {
		var question = questions[i];
		if(question.category==category) {
			filteredQns.push(question);
		}
	}
	
	if(qnsIndex < filteredQns.length) {
		var current = filteredQns[qnsIndex];
		var questionTitle = $("#questionTitle");
		questionTitle.html((qnsIndex+1) + ". " + current.qns);

		var optA = current.choices[0];
		var optA_Box = $("#optionA");
		optA_Box.html(optA.title);

		var optB = current.choices[1];
		var optB_Box = $("#optionB");
		optB_Box.html(optB.title);

		var optC = current.choices[2];
		var optC_Box = $("#optionC");
		optC_Box.html(optC.title);

		var optD = current.choices[3];
		var optD_Box = $("#optionD");
		optD_Box.html(optD.title);

		optA_Box.css("background-color", "darkseagreen");
		optB_Box.css("background-color", "darkseagreen");
		optC_Box.css("background-color", "darkseagreen");
		optD_Box.css("background-color", "darkseagreen");
		qnsIndex++;
	}
	
	else {
		qnsIndex = 0;
		var totalScore = 0;
		for(var i=0;i<selections.length;i++) {
			var selection = selections[i];
			var question = null;
			for(var h=0;h<questions.length;h++) {
				var q = questions[h];
				if(q.no == selection.qnsNo) {
					question = q;
					break;
				}
			}
			if(selection.selected == question.correctAns) {
				totalScore += parseInt(question.points);
			}
		}
		
		var totalMarks = 0;
		for(var h=0;h<questions.length;h++) {
			var q = questions[h];
			totalMarks += parseInt(question.points);
		}
		var percScore = (totalScore / totalMarks) * 100;
		var failed = true;
		
		if(percScore > 50) {
			failed = false;
		}
		
		var resultPanel = $("#result-panel");
		resultPanel.css("display","block");
		
		var questionPanel = $("#question-panel");
		questionPanel.css("display","none");
		
		var scoreBox = $("#totalScore");
		scoreBox.html("Score: " + totalScore + "/" + totalMarks);
		
		var result = "";
		if(failed == true) {
			result = "<img src='images/tenor.gif' width='250' height='200' alt='failed'/>";
		}
		else {
			result = "<img src='images/excellent.png' width='250' height='200' alt='passed'/>";
		}
		var myresult = $("#myresult");
		myresult.html(result);
		
		var closeResultButton = $("#closeResultButton");
		closeResultButton.click(function() {
			$.fancybox.close();
			selections = [];
			questionPanel.css("display","block");
			resultPanel.css("display","none");
			
			var clientX = currentClient.offset().left;
			var clientY = currentClient.offset().top;
			if(failed == true){
				var exit = $("#exit_img_holder");
				var exitX = exit.offset().left;
				var exitY = exit.offset().top;
				
				var diffX = exitX - clientX;
				var diffY = exitY - clientY;
				
				currentClient.css("zIndex", 3000);
				currentClient.animate(
								{
									left: "+=" + diffX,
									top: "+=" + diffY,
								},
								1000).fadeOut(2000, function() {
											count--;
											newClient();
										}
									);
			}
			else {
				var cashier = $("#cashier_img_holder");
				var cashierX = cashier.offset().left;
				var cashierY = cashier.offset().top;
				
				var diffX = cashierX - clientX;
				var diffY = cashierY - clientY;
				
				currentClient.css("zIndex", 3000);
				currentClient.animate(
								{
									left: "+=" + diffX,
									top: "+=" + diffY,
								},
								1000, function() {
									showCashierDialog(currentClient);
					});
			}
			closeResultButton.unbind();
		});
	}
}

function ansBox_click(selectedChoice) {
	var optA_Box = $("#optionA");
	var optB_Box = $("#optionB");
	var optC_Box = $("#optionC");
	var optD_Box = $("#optionD");
	optA_Box.css("background-color","darkseagreen");
	optB_Box.css("background-color","darkseagreen");
	optC_Box.css("background-color","darkseagreen");
	optD_Box.css("background-color","darkseagreen");
	if(selectedChoice == "a") {
		optA_Box.css("background-color","khaki");
	}
	else if(selectedChoice == "b") {
		optB_Box.css("background-color","khaki");
	}	
	else if(selectedChoice == "c") {
		optC_Box.css("background-color","khaki");
	}
	else if(selectedChoice == "d") {
		optD_Box.css("background-color","khaki");
	}
	var selection = {
						"qnsNo" : qnsIndex,
						"selected" : selectedChoice,
						"qnsType" : "mcq"
					};
	selections.push(selection);
}

