/*
 *	File:			app.js
 *  Description:	app starts here
 *  Author:			Rathinho Zhang
 */

// Global namespace
var App = App || {};

$(function() {
	App.Start = new App.Router();
	App.Start.start();
});