

function parseURL(url) {
  var parser = document.createElement('a');
  var searchObject = {};
  var queries;
  var split;
  var i;
  // Let the browser do the work
  parser.href = url;

  // Convert query string to object
  queries = parser.search.replace(/^\?/, '').split('&');
  for ( i = 0; i < queries.length; i++ ) {
    split = queries[i].split('=');
    searchObject[split[0]] = split[1];
  }
  return {
    protocol : parser.protocol,
    host : parser.host,
    hostname : parser.hostname,
    port : parser.port,
    pathname : parser.pathname,
    search : parser.search,
    searchObject : searchObject,
    hash : parser.hash
  };
}

function jq( myid ) {
  return "#" + myid.replace( /(:|\.|\[|\]|,)/g, "\\$1" );
}

/**
 * Peform a Network Service Lookup, using StatDNS API.
 *
 * @param  nid    identifier of element that will be updated with answer
 * @param   dn    A well-formed domain name to resolve.
 */
function NSLookup(nid, dn) {
  var url = "https://examples.dataone.org/rrda/8.8.8.8:53/%FQDN%/a".replace("%FQDN%",dn);
  var theResult = "";
  $.ajax({
    dataType: "json",
    url: url,
    async: true,
    success: function(response) {
      //console.log("nid = " + nid);
      //console.log(response)
      for (var i=0; i < response.answer.length; i++) {
        if (response.answer[i]['type'] == 'A') {
          $(jq(nid)).text(response.answer[i]['rdata']);
        }
      }
      $(nid).text("");
    },
  });
}

function nodeVersions(xml) {
  var versions = [];
  $(xml).find("service").each( function() {
    var v = $(this).attr("version");
    if (versions.indexOf(v) < 0) {
      versions.push(v);
    }
  });
  return versions;
}


function generateNodeTable(xml) {
  var table = $("#extracted_values");
  var th = "<th data-sort='string'>Type</th>";
  th += "<th data-sort='string'>Node ID</th>";
  th += "<th>Versions</th>"
  th += "<th data-sort='string'>Base URL</th>";
  th += "<th data-sort='string'>IP</th>";
  th += "<th data-sort='string-ins'>Last harvest</th>";
  table.append("<thead><tr>" + th + "</tr></thead>");
  table.append("<tbody>")
  $(xml).find("node").each( function() {
    var nodeid = $(this).find("identifier").text();
    var url = $(this).find("baseURL").text();
    var ntype = $(this).attr("type");
    var urlparts = parseURL(url);
    var ip = NSLookup("ip_" + urlparts.hostname, urlparts.hostname);
    var last_harvest = '';
    if (ntype == "mn") {
       last_harvest = $(this).find("lastHarvested").text()    
    }
    var versions = nodeVersions(this);
    var td = "<td>" + ntype + "</td>";
    td += "<td>" + nodeid + "</td>";
    td += "<td>" + versions.join() + "</td>";
    td += "<td>" + url + "</td>";
    td += "<td id='ip_" + urlparts.hostname + "'></td>";
    td += "<td>" + last_harvest + "</td>";
    table.append("<tr>" + td + "</tr>");
  });
  table.stupidtable();
}


function getXML(url, processfunc) {
  $('#xml_output').empty();
  $('#xml_output').text("Working...");
  $("#extracted_values").empty();
  if ( typeof (processfunc) != "function") {
    processfunc = defaultXMLProcessing;
  }
  log.info("Loading " + url);
  var proxy = $(location).attr('protocol') + "//" + $(location).attr('host');
  proxy += "/__ajaxproxy/";
  var proxyurl = proxy + url;
  $.ajax({
    type : "GET",
    url : url,
    dataType : "xml",
    async : true,
    success : function(xml) {
      $('#xml_output').empty();
      processfunc(xml);
    },
    error : function(jqXHR, textStatus, errorThrown) {
      $('#xml_output').empty();
      if (jqXHR.status == 303) {
        log.info("Success, but redirect");
        var xml = $.parseXML(jqXHR.responseText);
        processfunc(xml);
      } else {
        log.error("Request failed: " + proxyurl);
        var msg = "Error(" + jqXHR.status + "): " + errorThrown;
        log.error(msg);
        msg += "\n";
        msg += jqXHR.responseText;
        $('#xml_output').text(msg);
      }
    }
  });
}
