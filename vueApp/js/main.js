let app = new Vue({
    el: '.main',
    data: {
    showMain: true,
    showSocial: false,
    showAchievements: false,
    showResults: false,
    showQuestions: false,
    number: 0,
    score: {
        'zerg': 0,
        'primal': 0,
        'protoss': 0,
        'taldarim': 0,
        'terran': 0,
    },
    totalGame: localStorage.getItem('sc2TotalGame') ? JSON.parse(localStorage.getItem('sc2TotalGame')) : {
        'zerg': 0,
        'primal': 0,
        'protoss': 0,
        'taldarim': 0,
        'terran': 0,
        'infested': 0,
        'hybrid': 0,
    },
    totalGames: localStorage.getItem('sc2TotalGames') ? localStorage.getItem('sc2TotalGames') : 0,
        questions: questions,
        results: results,
        resultRace: 'infested'
    },
    methods: {
        goToMain() {
            this.showMain = true
            this.showSocial = false
            this.showAchievements = false
            this.showResults = false
            this.showQuestions = false
        },
        goToSocial() {
            this.showMain = false
            this.showSocial = true
            this.showAchievements = false
            this.showResults = false
            this.showQuestions = false
        },
        goToAchievements() {
            if (this.totalGames > 0) {
                this.showMain = false
                this.showSocial = false
                this.showAchievements = true
                this.showResults = false
                this.showQuestions = false
            } else {
                this.goToQuestions()
            }
        },
        goToQuestions() {
            this.score = {
                'zerg': 0,
                'primal': 0,
                'protoss': 0,
                'taldarim': 0,
                'terran': 0,
            }
            this.showMain = false
            this.showSocial = false
            this.showAchievements = false
            this.showResults = false
            this.showQuestions = true
        },
        goToResults(race) {
            this.showMain = false
            this.showSocial = false
            this.showAchievements = false
            this.showResults = true
            this.showQuestions = false
            this.resultRace = race
        },
        nextQuestions(answer) {
            if (this.number == 24) {
                this.number = 0;
                this.endGame();
            } else {
                this.number++
            }
            eval(answer)
        },
        endGame() {
            this.totalGames++
            localStorage.setItem('sc2TotalGames', this.totalGames)
            //zerg
            if (this.score.zerg > this.score.protoss && this.score.zerg > this.score.terran && this.score.primal < 8 &&
            Math.abs(this.score.protoss - this.score.zerg) > 3) {
                this.goToResults('zerg')
                this.totalGame.zerg++
            } else if (this.score.primal > this.score.protoss && this.score.primal > this.score.terran && this.score.primal === 8) {
                this.goToResults('primal')
                this.totalGame.primal++
            } else if (this.score.protoss > this.score.zerg && this.score.protoss > this.score.terran && this.score.taldarim < 5 &&
                Math.abs(this.score.protoss - this.score.zerg) > 3) {
                this.goToResults('protoss')
                this.totalGame.protoss++
            } else if (this.score.protoss > this.score.zerg && this.score.protoss > this.score.terran && this.score.taldarim === 5){
                this.goToResults('taldarim')
                this.totalGame.taldarim++
            } else if (this.score.terran > this.score.zerg && this.score.terran > this.score.protoss){
                this.goToResults('terran')
                this.totalGame.terran++
            } else if (Math.abs(this.score.protoss - this.score.zerg) <= 3) {
                this.goToResults('hybrid')
                this.totalGame.hybrid++
            } else {
                this.goToResults('infested')
                this.totalGame.infested++
            }
            localStorage.setItem('sc2TotalGame', JSON.stringify(this.endGame()))
        }
    },
})
