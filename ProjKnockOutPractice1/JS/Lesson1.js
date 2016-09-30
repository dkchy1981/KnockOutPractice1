// Here's my data model
var ViewModel = function (first,mid, last) {

    self.currentTemplate = ko.observable("viewtemplate");

    this.firstName = ko.observable(first);
    this.midName = ko.observable(mid);
    this.lastName = ko.observable(last);

    this.fullName = ko.pureComputed(function () {
        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
        return this.firstName() + " " + this.midName() + " "+ this.lastName();
    }, this);


};

ko.applyBindings(new ViewModel("Devendra",'Kumar', "Choudhary")); // This makes Knockout get 