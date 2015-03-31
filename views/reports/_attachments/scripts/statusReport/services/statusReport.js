// Faraday Penetration Test IDE
// Copyright (C) 2013  Infobyte LLC (http://www.infobytesec.com/)
// See the file 'doc/LICENSE' for the license information

angular.module('faradayApp')
    .factory('statusReportFact', ['vulnsFact', 'vulnsWebFact', 'hostsFact', 'workspacesFact', function(vulnsFact, vulnsWebFact, hostsFact, workspacesFact) {
        var statusReportFact = {};

        statusReportFact.getVulns = function(ws) {
            var vulns       = vulnsFact.get(ws);
            var vulnsWeb    = vulnsWebFact.get(ws);
            var hosts       = hostsFact.get(ws);
            vulns.forEach(function(element, index, array) {
                element.target = hosts[element.parent].name;
            });
            vulnsWeb.forEach(function(element, index, array) {
                element.target = hosts[element.parent].name;
            });
            return vulnsWeb.concat(vulns);
        };

        statusReportFact.putVulns = function(ws, vuln, callback) {
            if(vuln.web) {
                vulnsWebFact.put(ws, vuln, callback);
            } else {
                vulnsFact.put(ws, vuln, callback);
            }
        };

        statusReportFact.removeVulns = function(ws, vuln) {
            vulnsFact.remove(ws, vuln);
        };

        statusReportFact.getWorkspaces = function() {
            return workspacesFact.list();
        };

        return statusReportFact;
    }]);
