import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Alert } from 'selenium-webdriver';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-live-scores',
  templateUrl: './live-scores.component.html',
  styleUrls: ['./live-scores.component.css']
})
export class LiveScoresComponent implements OnInit {
  sportId: string = '';
  page: string = '';

  fixture: boolean = true;
  scoreboard: boolean = true;
  matchinfo: boolean = true;
  gameleaders: boolean = true;
  playbyplay: boolean = true;
  

  isScoreData: boolean = false;
  loading: boolean = false;
  constructor(public apiService: ApiService, public notificationsService: NotificationsService, public activatedRoute: ActivatedRoute) {
    this.loadTwitter();
   
   }
  sportsDetail: any = [];
  ngOnInit(): void {
     this.sportId = this.activatedRoute.params['value']['id'];
    

     
    this.activatedRoute.params.subscribe(
      params => {
        

        if(localStorage.getItem("reload") == "1"){
          localStorage.setItem("reload", "0");
          
         }else{
    
            localStorage.setItem("reload", "1");
            window.location.reload()
          }
    

            this.sportId = (params['id'])?params['id']:''
            this.page = (params['page'])?params['page']:''

            if(this.sportId == "nba") {
              this.nba();
            }else if(this.sportId == "nfl"){

              this.gameleaders = false;  

              this.nfl();
            }else if(this.sportId == "nhl"){
              
              this.playbyplay = false;
  

              this.nhl();
            }else if(this.sportId == "baseball"){

            this.matchinfo = false;
            this.gameleaders = false;
            this.playbyplay = false;
  

              this.baseball();
            }
       
      }
    );

    
    }

  
    
    nba(){
       if(this.page == "fixture"){
        this.nbaFixture();
       }else if(this.page == "scoreboard"){
        this.nbaScoreboard();
       }else if(this.page == "matchinfo"){
        this.nbaMatchinfo();
      }else if(this.page == "gameleaders"){
        this.nbaGameleaders();
      }else if(this.page == "playbyplay"){
        this.nbaPlaybyplay();
      }else{
        this.nbaLive();
      }




    }
    nfl(){

      if(this.page == "fixture"){
        this.nflFixture();
       }else if(this.page == "scoreboard"){
        this.nflScoreboard();
       }else if(this.page == "matchinfo"){
        this.nflMatchinfo();
      }else if(this.page == "gameleaders"){
        alert("Not available");
        // this.nflGameleaders();
      }else if(this.page == "playbyplay"){
        this.nflPlaybyplay();
      }else{
       //live
       this.nflLive();
     }

    }    
    nhl(){
      if(this.page == "fixture"){
        this.nhlFixture();
       }else if(this.page == "scoreboard"){
        this.nhlScoreboard();
       }else if(this.page == "matchinfo"){
        this.nhlMatchinfo();
      }else if(this.page == "gameleaders"){
        this.nhlGameleaders(); 
      }else if(this.page == "playbyplay"){
        alert("Not available")
        // this.nhlPlaybyplay();
      }else{
        this.nhlLive();
      }
    }
    baseball(){
      if(this.page == "fixture"){
        this.baseballFixture();
       }else if(this.page == "scoreboard"){
        this.baseballscoreboard();
       }else if(this.page == "matchinfo"){
        alert("not available");
        //this.baseballMatchinfo();
      }else if(this.page == "gameleaders"){
        alert("not available");
        //  this.baseballGameleaders();
      }else if(this.page == "playbyplay"){
        alert("not available");
        // this.baseballPlaybyplay();
      }else{
       this.baseballLive();
     }
    }


  getSportDetailsById() {
    this.loading = true;
    this.apiService.getSportDetailsById({ date: this.apiService.getOnlyDate(), sportId: this.sportId }).subscribe((res: any) => {
      this.loading = false;
      if (res.data.events.length == 0) this.isScoreData = true;
      this.sportsDetail = res.data.events;
      console.log(this.sportsDetail);
    })
  }

  convertToArry(lines){
    if(lines){
      var result = Object.values(lines);
      return result;
    } else [];
  }



  
  
  async loadWidget ()  {     
    var z = ` 
    (function(b, s, p, o, r, t) {
      b["broadage"] = b["broadage"] || [];
      if (!b["broadage"].length) {
        r = document.createElement(s);
        t = document.getElementsByTagName(s)[0];
        r.async = true;
        r.src = p;
        t.parentNode.insertBefore(r, t);
      }
      b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
    })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
      "bundleId": ["all-ls"],
      "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
      "widgets": {
        "liveScore": [{
          "element": "DOM_element_id_in_your_website_1638543243477",
          "coverageId": "6bf0cf44-e13a-44e1-8008-ff17ba6c2128"
        }]
      }
    });
     `;
   
       var s = window.document.createElement("script");
       s.id = "scoring-widget";
       s.append(z);
       window.document.body.appendChild(s);
   }


   async loadTwitter ()  {     

    var s = window.document.createElement("script");
    s.id = "twitter-script";
    s.charset = "utf-8";
    s.src = "https://platform.twitter.com/widgets.js";
    window.document.body.appendChild(s);
}



/////////////////baseball live


async baseballLive ()  {     
  var z = ` 
  (function(b, s, p, o, r, t) {
    b["broadage"] = b["broadage"] || [];
    if (!b["broadage"].length) {
      r = document.createElement(s);
      t = document.getElementsByTagName(s)[0];
      r.async = true;
      r.src = p;
      t.parentNode.insertBefore(r, t);
    }
    b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
  })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
    "bundleId": ["all-ls"],
    "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
    "widgets": {
      "liveScore": [{
        "element": "DOM_element_id_in_your_website_1638543243477",
        "coverageId": "6bf0cf44-e13a-44e1-8008-ff17ba6c2128",
        "options": {
          "sportFilter": false,
          "sportId": 11
        }
      }]
    }
  });


   `;
 
     var s = window.document.createElement("script");
     s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
 }


 async nhlLive ()  {     
  var z = ` 
  (function(b, s, p, o, r, t) {
    b["broadage"] = b["broadage"] || [];
    if (!b["broadage"].length) {
      r = document.createElement(s);
      t = document.getElementsByTagName(s)[0];
      r.async = true;
      r.src = p;
      t.parentNode.insertBefore(r, t);
    }
    b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
  })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
    "bundleId": ["all-ls"],
    "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
    "widgets": {
      "liveScore": [{
        "element": "DOM_element_id_in_your_website_1638543243477",
        "coverageId": "6bf0cf44-e13a-44e1-8008-ff17ba6c2128",
        "options": {
          "sportFilter": false,
          "sportId": 9
        }
      }]
    }
  });
   `;
 
     var s = window.document.createElement("script");
     s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
 }



 
 async nbaLive ()  {     
  var z = ` 
  (function(b, s, p, o, r, t) {
    b["broadage"] = b["broadage"] || [];
    if (!b["broadage"].length) {
      r = document.createElement(s);
      t = document.getElementsByTagName(s)[0];
      r.async = true;
      r.src = p;
      t.parentNode.insertBefore(r, t);
    }
    b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
  })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
    "bundleId": ["all-ls"],
    "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
    "widgets": {
      "liveScore": [{
        "element": "DOM_element_id_in_your_website_1638543243477",
        "coverageId": "6bf0cf44-e13a-44e1-8008-ff17ba6c2128",
        "options": {
          "sportFilter": false,
          "sportId": 2
        }
      }]
    }
  });
   `;
 
     var s = window.document.createElement("script");
     s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
 }



 
 async nflLive ()  {     
  var z = ` 
  (function(b, s, p, o, r, t) {
    b["broadage"] = b["broadage"] || [];
    if (!b["broadage"].length) {
      r = document.createElement(s);
      t = document.getElementsByTagName(s)[0];
      r.async = true;
      r.src = p;
      t.parentNode.insertBefore(r, t);
    }
    b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
  })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
    "bundleId": ["all-ls"],
    "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
    "widgets": {
      "liveScore": [{
        "element": "DOM_element_id_in_your_website_1638543243477",
        "coverageId": "6bf0cf44-e13a-44e1-8008-ff17ba6c2128",
        "options": {
          "sportFilter": false,
          "sportId": 10
        }
      }]
    }
  });
   `;
 
     var s = window.document.createElement("script");
  s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
 }



 
//////////////////////


 nbaFixture(){
    var z = ` 
    (function(b, s, p, o, r, t) {
      b["broadage"] = b["broadage"] || [];
      if (!b["broadage"].length) {
        r = document.createElement(s);
        t = document.getElementsByTagName(s)[0];
        r.async = true;
        r.src = p;
        t.parentNode.insertBefore(r, t);
      }
      b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
    })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
      "bundleId": ["basketball-fx"],
      "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
      "widgets": {
        "basketballFixture": [{
          "element": "DOM_element_id_in_your_website_1638543243477",
          "tournamentId": 9
        }]
      }
    });
   `;
 
     var s = window.document.createElement("script");
  s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
 }
 
nbaScoreboard(){
   var z = ` 
   (function(b, s, p, o, r, t) {
    b["broadage"] = b["broadage"] || [];
    if (!b["broadage"].length) {
      r = document.createElement(s);
      t = document.getElementsByTagName(s)[0];
      r.async = true;
      r.src = p;
      t.parentNode.insertBefore(r, t);
    }
    b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
  })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
    "bundleId": ["basketball-sb"],
    "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
    "widgets": {
      "basketballScoreboard": [{
        "element": "DOM_element_id_in_your_website_1638543243477",
        "matchId": 354864
      }]
    }
  });
   `;
 
     var s = window.document.createElement("script");
  s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
}
nbaMatchinfo(){
   var z = ` 
   (function(b, s, p, o, r, t) {
    b["broadage"] = b["broadage"] || [];
    if (!b["broadage"].length) {
      r = document.createElement(s);
      t = document.getElementsByTagName(s)[0];
      r.async = true;
      r.src = p;
      t.parentNode.insertBefore(r, t);
    }
    b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
  })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
    "bundleId": ["basketball-mi"],
    "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
    "widgets": {
      "basketballMatchInfo": [{
        "element": "DOM_element_id_in_your_website_1638543243477",
        "matchId": 354864
      }]
    }
  });
   `;
 
     var s = window.document.createElement("script");
  s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
}
nbaGameleaders(){
   var z = ` 
   (function(b, s, p, o, r, t) {
    b["broadage"] = b["broadage"] || [];
    if (!b["broadage"].length) {
      r = document.createElement(s);
      t = document.getElementsByTagName(s)[0];
      r.async = true;
      r.src = p;
      t.parentNode.insertBefore(r, t);
    }
    b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
  })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
    "bundleId": ["basketball-gl"],
    "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
    "widgets": {
      "basketballGameLeaders": [{
        "element": "DOM_element_id_in_your_website_1638543243477",
        "matchId": 354864
      }]
    }
  });
   `;
 
     var s = window.document.createElement("script");
  s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
}
nbaPlaybyplay(){
   var z = ` 
   (function(b, s, p, o, r, t) {
    b["broadage"] = b["broadage"] || [];
    if (!b["broadage"].length) {
      r = document.createElement(s);
      t = document.getElementsByTagName(s)[0];
      r.async = true;
      r.src = p;
      t.parentNode.insertBefore(r, t);
    }
    b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
  })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
    "bundleId": ["basketball-pbp"],
    "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
    "widgets": {
      "basketballPlayByPlay": [{
        "element": "DOM_element_id_in_your_website_1638543243477",
        "matchId": 354864
      }]
    }
  });
   `;
 
     var s = window.document.createElement("script");
  s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
}
nhlFixture(){
   var z = ` 
   (function(b, s, p, o, r, t) {
    b["broadage"] = b["broadage"] || [];
    if (!b["broadage"].length) {
      r = document.createElement(s);
      t = document.getElementsByTagName(s)[0];
      r.async = true;
      r.src = p;
      t.parentNode.insertBefore(r, t);
    }
    b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
  })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
    "bundleId": ["iceHockey-fx"],
    "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
    "widgets": {
      "iceHockeyFixture": [{
        "element": "DOM_element_id_in_your_website_1638543243477",
        "tournamentId": 2
      }]
    }
  });
   `;
 
     var s = window.document.createElement("script");
  s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
}
nhlScoreboard(){
   var z = ` 
   (function(b, s, p, o, r, t) {
    b["broadage"] = b["broadage"] || [];
    if (!b["broadage"].length) {
      r = document.createElement(s);
      t = document.getElementsByTagName(s)[0];
      r.async = true;
      r.src = p;
      t.parentNode.insertBefore(r, t);
    }
    b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
  })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
    "bundleId": ["iceHockey-hr"],
    "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
    "widgets": {
      "iceHockeyH2hResults": [{
        "element": "DOM_element_id_in_your_website_1638543243477",
        "matchId": 114701
      }]
    }
  });
   `;
 
     var s = window.document.createElement("script");
  s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
}
nhlMatchinfo(){
   var z = ` 
   (function(b, s, p, o, r, t) {
    b["broadage"] = b["broadage"] || [];
    if (!b["broadage"].length) {
      r = document.createElement(s);
      t = document.getElementsByTagName(s)[0];
      r.async = true;
      r.src = p;
      t.parentNode.insertBefore(r, t);
    }
    b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
  })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
    "bundleId": ["iceHockey-mh"],
    "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
    "widgets": {
      "iceHockeyMatchHeader": [{
        "element": "DOM_element_id_in_your_website_1638543243477",
        "matchId": 114701
      }]
    }
  });
   `;
 
     var s = window.document.createElement("script");
  s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
}


nhlPlaybyplay(){
   var z = ` 
  (function(b, s, p, o, r, t) {
    b["broadage"] = b["broadage"] || [];
    if (!b["broadage"].length) {
      r = document.createElement(s);
      t = document.getElementsByTagName(s)[0];
      r.async = true;
      r.src = p;
      t.parentNode.insertBefore(r, t);
    }
    b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
  })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
    "bundleId": ["all-ls"],
    "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
    "widgets": {
      "liveScore": [{
        "element": "DOM_element_id_in_your_website_1638543243477",
        "coverageId": "6bf0cf44-e13a-44e1-8008-ff17ba6c2128",
        "options": {
          "sportFilter": false,
          "sportId": 10
        }
      }]
    }
  });
   `;
 
     var s = window.document.createElement("script");
  s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
}
nflFixture(){
   var z = ` 
   (function(b, s, p, o, r, t) {
    b["broadage"] = b["broadage"] || [];
    if (!b["broadage"].length) {
      r = document.createElement(s);
      t = document.getElementsByTagName(s)[0];
      r.async = true;
      r.src = p;
      t.parentNode.insertBefore(r, t);
    }
    b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
  })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
    "bundleId": ["all-ls"],
    "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
    "widgets": {
      "liveScore": [{
        "element": "DOM_element_id_in_your_website_1638543243477",
        "coverageId": "6bf0cf44-e13a-44e1-8008-ff17ba6c2128",
        "options": {
          "sportFilter": false,
          "sportId": 10
        }
      }]
    }
  });
   `;
 
     var s = window.document.createElement("script");
  s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
}
nflScoreboard(){
   var z = ` 
   (function(b, s, p, o, r, t) {
    b["broadage"] = b["broadage"] || [];
    if (!b["broadage"].length) {
      r = document.createElement(s);
      t = document.getElementsByTagName(s)[0];
      r.async = true;
      r.src = p;
      t.parentNode.insertBefore(r, t);
    }
    b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
  })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
    "bundleId": ["football-sb"],
    "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
    "widgets": {
      "footballScoreboard": [{
        "element": "DOM_element_id_in_your_website_1638543243477",
        "matchId": 21900
      }]
    }
  });
   `;
 
     var s = window.document.createElement("script");
  s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
}
nflMatchinfo(){
   var z = ` 
   (function(b, s, p, o, r, t) {
    b["broadage"] = b["broadage"] || [];
    if (!b["broadage"].length) {
      r = document.createElement(s);
      t = document.getElementsByTagName(s)[0];
      r.async = true;
      r.src = p;
      t.parentNode.insertBefore(r, t);
    }
    b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
  })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
    "bundleId": ["football-lmsts"],
    "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
    "widgets": {
      "footballLiveMatchStatistics": [{
        "element": "DOM_element_id_in_your_website_1638543243477",
        "matchId": 21900
      }]
    }
  });
   `;
 
     var s = window.document.createElement("script");
  s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
}
nhlGameleaders(){
   var z = ` 
   (function(b, s, p, o, r, t) {
    b["broadage"] = b["broadage"] || [];
    if (!b["broadage"].length) {
      r = document.createElement(s);
      t = document.getElementsByTagName(s)[0];
      r.async = true;
      r.src = p;
      t.parentNode.insertBefore(r, t);
    }
    b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
  })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
    "bundleId": ["football-gl"],
    "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
    "widgets": {
      "footballGameLeaders": [{
        "element": "DOM_element_id_in_your_website_1638543243477",
        "matchId": 21900
      }]
    }
  });
   `;
 
     var s = window.document.createElement("script");
  s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
}
nflPlaybyplay(){
   var z = ` 
   (function(b, s, p, o, r, t) {
    b["broadage"] = b["broadage"] || [];
    if (!b["broadage"].length) {
      r = document.createElement(s);
      t = document.getElementsByTagName(s)[0];
      r.async = true;
      r.src = p;
      t.parentNode.insertBefore(r, t);
    }
    b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
  })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
    "bundleId": ["football-pbp"],
    "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
    "widgets": {
      "footballPlayByPlay": [{
        "element": "DOM_element_id_in_your_website_1638543243477",
        "matchId": 21900
      }]
    }
  });
   `;
 
     var s = window.document.createElement("script");
  s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
}
baseballFixture(){
   var z = ` 
   (function(b, s, p, o, r, t) {
    b["broadage"] = b["broadage"] || [];
    if (!b["broadage"].length) {
      r = document.createElement(s);
      t = document.getElementsByTagName(s)[0];
      r.async = true;
      r.src = p;
      t.parentNode.insertBefore(r, t);
    }
    b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
  })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
    "bundleId": ["baseball-fx"],
    "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
    "widgets": {
      "baseballFixture": [{
        "element": "DOM_element_id_in_your_website_1638543243477",
        "tournamentId": 3
      }]
    }
  });
   `;
 
     var s = window.document.createElement("script");
  s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
}
baseballscoreboard(){
   var z = ` 
  (function(b, s, p, o, r, t) {
    b["broadage"] = b["broadage"] || [];
    if (!b["broadage"].length) {
      r = document.createElement(s);
      t = document.getElementsByTagName(s)[0];
      r.async = true;
      r.src = p;
      t.parentNode.insertBefore(r, t);
    }
    b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
  })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
    "bundleId": ["all-ls"],
    "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
    "widgets": {
      "liveScore": [{
        "element": "DOM_element_id_in_your_website_1638543243477",
        "coverageId": "6bf0cf44-e13a-44e1-8008-ff17ba6c2128",
        "options": {
          "sportFilter": false,
          "sportId": 10
        }
      }]
    }
  });
   `;
 
     var s = window.document.createElement("script");
  s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
}
baseballMatchinfo(){
   var z = ` 
  (function(b, s, p, o, r, t) {
    b["broadage"] = b["broadage"] || [];
    if (!b["broadage"].length) {
      r = document.createElement(s);
      t = document.getElementsByTagName(s)[0];
      r.async = true;
      r.src = p;
      t.parentNode.insertBefore(r, t);
    }
    b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
  })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
    "bundleId": ["all-ls"],
    "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
    "widgets": {
      "liveScore": [{
        "element": "DOM_element_id_in_your_website_1638543243477",
        "coverageId": "6bf0cf44-e13a-44e1-8008-ff17ba6c2128",
        "options": {
          "sportFilter": false,
          "sportId": 10
        }
      }]
    }
  });
   `;
 
     var s = window.document.createElement("script");
  s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
}
baseballGameleaders(){
   var z = ` 
  (function(b, s, p, o, r, t) {
    b["broadage"] = b["broadage"] || [];
    if (!b["broadage"].length) {
      r = document.createElement(s);
      t = document.getElementsByTagName(s)[0];
      r.async = true;
      r.src = p;
      t.parentNode.insertBefore(r, t);
    }
    b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
  })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
    "bundleId": ["all-ls"],
    "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
    "widgets": {
      "liveScore": [{
        "element": "DOM_element_id_in_your_website_1638543243477",
        "coverageId": "6bf0cf44-e13a-44e1-8008-ff17ba6c2128",
        "options": {
          "sportFilter": false,
          "sportId": 10
        }
      }]
    }
  });
   `;
 
     var s = window.document.createElement("script");
  s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
}

baseballPlaybyplay(){
   var z = ` 
  (function(b, s, p, o, r, t) {
    b["broadage"] = b["broadage"] || [];
    if (!b["broadage"].length) {
      r = document.createElement(s);
      t = document.getElementsByTagName(s)[0];
      r.async = true;
      r.src = p;
      t.parentNode.insertBefore(r, t);
    }
    b["broadage"].push({ "bundleId": o.bundleId, "widgets": o.widgets, "accountId": o.accountId });
  })(window, "script", "//cdn-saas.broadage.com/widgets/loader/loader.js", {
    "bundleId": ["all-ls"],
    "accountId": "872f164f-619b-4d1f-bd10-c1ece0adf3b7",
    "widgets": {
      "liveScore": [{
        "element": "DOM_element_id_in_your_website_1638543243477",
        "coverageId": "6bf0cf44-e13a-44e1-8008-ff17ba6c2128",
        "options": {
          "sportFilter": false,
          "sportId": 10
        }
      }]
    }
  });
   `;
 
     var s = window.document.createElement("script");
  s.id = "scoring-widget";
     s.append(z);
     window.document.body.appendChild(s);
}
  

}
