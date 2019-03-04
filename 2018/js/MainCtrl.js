angular.module('MainCtrl', []).controller('MainController', function($scope, $http, $location) {

  $scope.lines = [];
  $scope.defaultLabel = "remington$";
  $scope.label = $scope.defaultLabel;
  $scope.typing = false; 

  var apiKey = "fa56d5fe1f2265d534e82e7856729da1";
  var user = "rbreeze"; 
  var url_suffix = "&user="+user+"&api_key="+apiKey+"&format=json&limit=5";
  var url_prefix="http://ws.audioscrobbler.com/2.0/?method=";

  $('.terminal').click(function() {
    $('.current-line-input').focus(); 
  })

  var type = function(string, callback) {
    $('.typed').html("");
    $('.typed-cursor').remove();
    $scope.typing = true; 
    $scope.lines = [];
    new Typed('.typed', { strings: [string], typeSpeed: 25, onComplete: function() {
      $scope.$apply(function() {
        $scope.typing = false;
        $('.typed-cursor').remove(); 
        callback(); 
      });  
    } }); 
    $('.current-line-input').focus();
  }

  var welcome = function() {
    var welcome = "<em>Welcome!</em> Please select an option from the menu on the right or type a command below. If you're stuck, just type 'help'.";
    type(welcome, function() {
      $scope.lines.push($scope.label + " " + welcome);
    });
  }

  welcome(); 

  var help = function() {
    $scope.commands = ["clear", "welcome", "echo", "health", "music", "resume", "about", "personal"];
    var $l = $scope.lines;
    $l.push("Available commands: "); 
    for (command in $scope.commands) {
      $l.push($scope.commands[command]);
    }
  }

  var recentMusic = function() {
    $scope.label = "";
    $http.get(url_prefix + "user.getrecenttracks" + url_suffix).then(function success(res) {
      $scope.lines.push("<em>Recently Played:</em>");
      for (track in res.data.recenttracks.track) {
        var currentTrack = res.data.recenttracks.track[track]; 
        $scope.lines.push("* <i>" + currentTrack.name + "</i> by " + currentTrack.artist["#text"]);
      }
      lineBreak(); 
      $scope.label = $scope.defaultLabel;
    }); 
  }

  var topMusic = function() {
    $scope.label = "";
    $http.get(url_prefix + "user.gettoptracks" + url_suffix).then(function success(res) {
      $scope.lines.push("<em>Top Tracks:</em>");
      for (track in res.data.toptracks.track) {
        var currentTrack = res.data.toptracks.track[track]; 
        $scope.lines.push("* <i>" + currentTrack.name + "</i> by " + currentTrack.artist["name"]);
      }
      lineBreak(); 
      $scope.label = $scope.defaultLabel;
    }); 
  }

  var topRecents = function() {
    $scope.label = "";
    $http.get(url_prefix + "user.getweeklytrackchart" + url_suffix).then(function success(res) {
      $scope.lines.push("<em>Top Tracks Recently:</em>");
      for (track in res.data.weeklytrackchart.track) {
        var currentTrack = res.data.weeklytrackchart.track[track]; 
        var playLabel = " plays";
        if (currentTrack.playcount == 1)
          playLabel = " play";
        $scope.lines.push("* <i>" + currentTrack.name + "</i> by " + currentTrack.artist["#text"] + " (" + currentTrack.playcount + playLabel + ")");
      }
      lineBreak(); 
      $scope.label = $scope.defaultLabel;
    }); 
  }

  var lineBreak = function() {
    $scope.lines.push("&nbsp;");
  }

  var about = function() {
    $scope.lines.push("<em>Thank you for visiting!</em>")
    $scope.lines.push("I've been building websites since I was 12 and have loved doing it ever since. Hope you enjoy this one!");
    lineBreak();
    $scope.lines.push("<i>Some 'interesting' things about me:</i>");
    $scope.lines.push("* I run cross country for CSU Chico");
    $scope.lines.push("* I play the cello and piano");
    $scope.lines.push("* I can solve a Rubiks cube in under 20 seconds (I've done it in 17)");
    $scope.lines.push("* I eat a bagel with peanut butter for breakfast pretty much every day");
    $scope.lines.push("* I hate ketchup");
    $scope.lines.push("* I use spaces, not tabs");
    lineBreak();
    $scope.lines.push("My <a target='_blank' href='https://www.instagram.com/rbreeze3/'>Instagram</a>"); 
    $scope.lines.push("My <a target='_blank' href='https://github.com/rbreeze/'>GitHub</a>");
    lineBreak(); 
  }

  var clear = function() {
    $scope.lines = [];
    $scope.currentLine = "";
    $scope.label = $scope.defaultLabel;
  }

  var morePrompt = function() {
    $scope.lines.push("Enter another number 1-5 for more or enter 0 to exit: ")
  }

  var personalInit = function() {
    var $l = $scope.lines;
    $l.push('This program displays some of my personal data.')
    $l.push('Select an option from the list below: ');  
    $l.push('<i>[1]</i> : Music');
    $l.push('<i>[2]</i> : Health'); 
    $scope.currentLine = "";
    $scope.label = "";
    $scope.running = "personal";
  }

  var resumeInit = function() {
    var $l = $scope.lines;
    $l.push('*****');
    $l.push('Remington’s Extended Software Utility for Maxiumum Employment');
    $l.push('<em>RESUME : v1.0</em>');
    $l.push('*****'); 
    $l.push('Select an option from the list below: ');  
    $l.push('<i>[1]</i> : Education');
    $l.push('<i>[2]</i> : Work experience'); 
    $l.push('<i>[3]</i> : Skills');
    $l.push('<i>[4]</i> : Projects');
    $scope.currentLine = "";
    $scope.label = "";
    $scope.running = "resume"; 
  }

  var music = function() {
    $scope.lines.push("Music Stats: ");
    lineBreak();
    recentMusic();
    topRecents();
    topMusic(); 
  }

  var education = function() {
    var $l = $scope.lines;
    $scope.currentLine="";
    $l.push("&nbsp;");
    $l.push("<em>CSU Chico</em>");
    $l.push("<i>B.S. in Computer Science</i> -- in progress");
    $l.push("Expected graduation -- <i>2020</i>");
    $l.push("Spring 2018 GPA -- <i>4.0</i>");
    $l.push("*****");
    $l.push("Relevant Courses:"); 
    $l.push("* Algorithms and Data Structures");
    $l.push("* Introduction to Databases");
    $l.push("* Embedded Systems Development");
    $l.push("* Systems Architecture");
    lineBreak(); 
    $l.push("<em>Vista del Lago High School</em>");
    $l.push("<i>4.12</i> Cummulative GPA");
    lineBreak(); 
    morePrompt();
  }

  var skills = function() {
    var $l = $scope.lines; 
    $scope.currentLine = "";
    lineBreak();
    $l.push("* <i>HTML</i>         [+++++++++++_]");
    $l.push("* <i>CSS / LESS</i>   [+++++++++++_]");
    $l.push("* <i>Javascript</i>   [+++++++++++_]");
    $l.push("* <i>Node JS</i>      [+++++++++++_]"); 
    $l.push("* <i>Vue.js</i>       [+++++++++++_]"); 
    $l.push("* <i>Angular JS</i>   [++++++++++__]");
    $l.push("* <i>React</i>        [++++++______]"); 
    $l.push("* <i>Bootstrap</i>    [+++++++++++_]");
    $l.push("* <i>MongoDB</i>      [+++++++++___]");
    $l.push("* <i>SQL</i>          [++++++______]");
    $l.push("* <i>Hadoop</i>       [++++++++____]");
    $l.push("* <i>Oracle</i>       [++++++______]");
    $l.push("* <i>Swift</i>        [+++++++++++_]");
    $l.push("* <i>C / C++</i>      [+++++++++___]");
    $l.push("* <i>PHP</i>          [++++++++____]");
    $l.push("* <i>Photoshop</i>    [+++++++++___]");
    $l.push("* <i>Premiere Pro</i> [++++++++____]");
    lineBreak(); 
    morePrompt();
  }

  var projects = function() {
    var $l = $scope.lines; 
    $scope.currentLine = "";
    $l.push("<em>Projects</em>");
    lineBreak(); 
    $l.push("* <i>RaceBase</i> - <a target='_blank' href='https://racebase.io'>racebase.io</a>");
    $l.push("A community sourced database of running results. Built with Node JS, Express, MongoDB, Angular JS, Bootstrap, LESS, and more.");
    $l.push("Something not apparent on the website itself is a web scraper I've built using Python, designed to gather race results from various websites. This makes it a lot easier for me to upload thousands of results.");
    $l.push("To learn more, visit the website and check out the About page!");
    lineBreak(); 
    $l.push("* <i>Techlore Website</i> - <a target='_blank' href='http://techlore.tech'>techlore.tech</a>");
    $l.push("Hosted on GitHub Pages, this static website I designed and built for a close friend features some cool animations and a clean mobile interface. Check it out and while you're there be sure to visit his <a href='https://www.youtube.com/channel/UCs6KfncB4OV6Vug4o_bzijg' target='_blank'>channel</a> as well!");
    lineBreak(); 
    $l.push("* <i>PaceCalc</i> - <a href='https://github.com/rbreeze/PaceCalc' target='_blank'>code on GitHub</a>");
    $l.push("Unfortunately due to the cost of an Apple developer membership, PaceCalc is no longer available in the App Store. However, the source code is available on my GitHub, and a newer 2018 version will be uploaded soon (if it hasn't been already). PaceCalc was written in Swift and used the classic design of a normal calculator to make it easy for athletes to calculate their paces and other important stats.");
    lineBreak(); 
    morePrompt();
  }

  var workExperience = function() {
    var $l = $scope.lines; 
    $scope.currentLine = "";
    lineBreak(); 
    $l.push("<em>Web Developer and Content Creator</em> at <i>The Colour Bar</i>");
    $l.push("June 2017 - October 2018");
    $l.push("I was responsible for creating an inventory management system for the business. I also created tutorial videos and social media promos to be posted to the company Instagram.");
    lineBreak(); 
    $l.push("<em>Recreation Leader</em> at <i>Tahoe Donner Association</i>");
    $l.push("June 2018 - August 2018");
    $l.push("My responsibilities included leading summer day camp programs with children ages 6-13, hosting events including Summer Concerts and Weekly Bingo, and helping guests at the Recreation department. This job taught me patience.");
    lineBreak(); 
    $l.push("<em>Web Developer and Communications Manager</em> at <i>Techlore</i>");
    $l.push("September 2017 - February 2018");
    $l.push("I developed a website for the Techlore YouTube channel, and was responsible for responding to comments and inquiries on the channel and all its videos.");
    lineBreak()
    $l.push("<em>Web Developer and Social Media Manager</em> at <i>First Choice Tutoring</i>");
    $l.push("November 2016 - April 2017");
    $l.push("I developed a static website hosted on GitHub pages for First Choice Tutoring, a local tutoring company. I also managed the company's social media presence, posting daily to Instagram and Facebook and engaging with the community, which grew the company's following from about 100 followers to over 1000 in a period of 3 months.");
    lineBreak();
    $l.push("<em>Other Roles:</em>"); 
    $l.push("* Team Captain, Vista del Lago High School Cross Country");
    $l.push("* Cello Section Leader, Vista del Lago Orchestra");
    $l.push("* Editor in Chief, Vista del Lago Newspaper"); 
    $l.push("<i>These roles taught me valuable leadership and communication skills and have shaped me into the person I am today.</i>");
    lineBreak(); 
    morePrompt(); 
  }

  var exitProgram = function() {
    $scope.label = $scope.defaultLabel;
    $scope.currentLine = "";
    $scope.running = false;
  }

  var resume = function(arg) {
    $scope.lines.push(arg);
    switch(arg) {
      case "0":
        exitProgram(); 
        break; 
      case "1":
        education(); 
        break;
      case "2": 
        workExperience(); 
        break;
      case "3": 
        skills(); 
        break;
      case "4": 
        projects(); 
        break;
      default:
        exitProgram(); 
        break;
    }
  }

  var personal = function(arg) {
    $scope.lines.push(arg);
    switch(arg) {
      case "0":
        exitProgram(); 
        break; 
      case "1":
        music(); 
        break;
      case "2": 
        health(); 
        break;
      default:
        break;
    }
    exitProgram(); 
  }

  // welcome(); 

  $scope.execute = function() {
    var currentLine = $scope.currentLine; 
    var args = currentLine.split(' '); 

    if ($scope.running) {
      switch($scope.running) {
        case "resume":
          resume(args[0]);
          break;
        case "personal":
          personal(args[0]);
          break;
        case "about":
          break;
      }
      return; 
    }

    if ($scope.label)
      $scope.lines.push($scope.label + " " + currentLine); 
    else 
      $scope.lines.push(currentLine);

    switch (args[0]) {
      case "clear": 
        clear(); 
        break;
      case "echo": 
        args.shift();
        $scope.lines.push(args.join(' '));
        break;
      case "help": 
        help(); 
        break;
      case "welcome":
        welcome(); 
        break;
      case "about": 
        about(); 
        break;
      case "health":
        health(); 
        break;
      case "music": 
        music(); 
        break;
      case "personal":
        personalInit(); 
        break;
      case "resume":
        resumeInit();
        break;
      case "skills": 
        skills(); 
        break;
      default: 
        $scope.lines.push("Command not found! Type 'help' for a list of commands.");
        break;
    }

    $scope.currentLine = "";
  }

  $scope.typeAndExecute = function(command) {
    clear(); 
    exitProgram(); 
    type(command + "^500", function() {
      $scope.currentLine = command; 
      $scope.execute(); 
    })
  }

}); 