describe('workspacesCtrl', function() {
    var $controller,
        $scope;

    var $workspacesFact,
    workspacesFactMock;

    beforeEach(function () { 
        workspacesFactMock = {
            get: function(callback) {
                callback(['ws1', 'ws2']);
            }
        };
        module('faradayApp');
        module(function($provide){
            $provide.value('workspacesFact', workspacesFactMock);
        });

        inject(function(_$rootScope_, _$controller_, _workspacesFact_){
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $scope = _$rootScope_.$new();
            $controller = _$controller_('workspacesCtrl',
                    { $scope: $scope, workspacesFact: _workspacesFact_});
        });
    });


    describe('Workspaces load in $scope.wss', function() {
        it('tests if wss is loaded properly', function() {
            expect($scope.wss).toEqual(['ws1', 'ws2']);
        });
    });
    describe('Workspaces inserts in $scope.wss', function() { 
        it('tests if wss is updated properly', function() {
            workspace_name = 'test_workspace';
            workspace = {
                "_id": workspace_name,
                "_rev": "2-bd88abf79cf2b7e8b419cd4387c64bef",
                "customer": "",
                "sdate": 1410832741.48194,
                "name": workspace_name,
                "fdate": 1410832741.48194,
                "type": "Workspace",
                "children": [
                ],
                "description": ""
            };
            $scope.insert(workspace);
            // http://jasmine.github.io/1.3/introduction.html#section-Matchers
            expect($scope.wss).toContain(workspace_name);
        });
    });
});

