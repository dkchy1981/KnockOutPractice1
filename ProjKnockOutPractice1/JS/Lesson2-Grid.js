var initialData = [
    { name: "Well-Travelled Kitten", sales: 352, price: 75.95 },
    { name: "Speedy Coyote", sales: 89, price: 190.00 },
    { name: "Furious Lizard", sales: 152, price: 25.00 },
    { name: "Indifferent Monkey", sales: 1, price: 99.95 },
    { name: "Brooding Dragon", sales: 0, price: 6350 },
    { name: "Ingenious Tadpole", sales: 39450, price: 0.35 },
    { name: "Optimistic Snail", sales: 420, price: 1.50 }
];
var gridColumns = ["name", "sales", "price"];

var PagedGridModel = function (items, gridColumn) {

    this.shortGridColumns = ko.observableArray(gridColumn);
    this.selectedGridColumn = ko.observable('name');
    this.shortedGridColumn = ko.observable('name');
    var shortDirection = 'A';

    this.showGrid = ko.observable(true);
    this.showTable = ko.observable(false);

    this.items = ko.observableArray(items);

    this.name = ko.observable();
    this.scount = ko.observable();
    this.iPrice = ko.observable();

    this.saveItem = function () {
        this.sortByName
        this.items.push({ name: this.name(), sales: this.scount(), price: parseFloat(this.iPrice()) });

        for (var i = 0; i < items.length; i++) {
            console.log(this.items()[i].price);
        }
        /*
        for (var i in this.items) {
            console.log('Price of items : ' + this.items.pop(i).price);
        }
        */
        console.log('All items processed.')

        this.showGrid(true);
        this.showTable(false);
    };
    this.addItem = function () {
        this.showGrid(false);
        this.showTable(true);
    }


    this.sortGrid = function () {
        
        
        if (this.shortedGridColumn() == this.selectedGridColumn()) {
            console.log(shortDirection);

            shortDirection = (shortDirection == 'D' ? 'A' : 'D');
          
        }
        else
        {
            shortDirection = 'A';
        }
        this.shortedGridColumn(this.selectedGridColumn());

        console.log(this.selectedGridColumn());
        console.log(this.shortedGridColumn());
        
        console.log(shortDirection);
        
        var selectedColumnForSorting = this.selectedGridColumn();
        this.items.sort(function (a, b) {
            switch (selectedColumnForSorting) {
                case 'name':
                    {
                        if (shortDirection == 'A') {
                            return a.name < b.name ? -1 : 1;
                        }
                        else if (shortDirection == 'D') {
                            return a.name > b.name ? -1 : 1;
                        }
                    }
                    break;
                case 'sales':
                    {
                        if (shortDirection == 'A') {
                            return a.sales < b.sales ? -1 : 1;
                        }
                        else if (shortDirection == 'D') {
                            return a.sales > b.sales ? -1 : 1;
                        }
                    }
                    break;
                case 'price':
                    {
                        if (shortDirection == 'A') {
                            return a.price < b.price ? -1 : 1;
                        }
                        else if (shortDirection == 'D') {
                            return a.price > b.price ? -1 : 1;
                        }
                    }
                    break;

                default:
                    {
                        if (shortDirection == 'A') {
                            return a.name < b.name ? -1 : 1;
                        }
                        else if (shortDirection == 'D') {
                            return a.name > b.name ? -1 : 1;
                        }
                    }
            }

        });
    };


    this.jumpToFirstPage = function () {
        this.gridViewModel.currentPageIndex(0);
    };

    this.gridViewModel = new ko.simpleGrid.viewModel({
        data: this.items,
        columns: [
            { headerText: "Item Name", rowText: "name" },
            { headerText: "Sales Count", rowText: "sales" },
            { headerText: "Price", rowText: function (item) { return "$" + item.price.toFixed(2) } }
        ],
        pageSize: 4
    });
};

ko.applyBindings(new PagedGridModel(initialData, gridColumns));