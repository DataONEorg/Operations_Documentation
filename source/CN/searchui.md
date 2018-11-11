# Search UI

![Search UI screenshot](images/metacatui-dataone-1000w.png)

## Updating the Search UI
The production Search UI, `search.dataone.org`, is hosted on three machines, and all need to be upgraded individually:

- `search-ucsb-1.dataone.org`
- `search-orc-1.dataone.org`
- `search-unm-1.dataone.org`

For the DataONE test environments, all Search UIs are hosted on a single machine:
- `search.test.dataone.org`

This machine is configured to host the following virtual hosts:
- `search-dev.test.dataone.org`
- `search-dev-2.test.dataone.org`
- `search-sandbox.test.dataone.org`
- `search-sandbox-2.test.dataone.org`
- `search-stage.test.dataone.org`
- `search-stage-2.test.dataone.org`

When upgrading the SearchUI software for each environment, it will be installed in the appropriate `DocumentRoot` configured for the virtual host.

## Upgrade steps

1. Download the latest version of MetacatUI from https://github.com/NCEAS/metacatui/releases
     
    ```bash 
     wget https://github.com/NCEAS/metacatui/archive/METACATUI_1_14_14.zip
     ```

2. Unpack the `.zip` or `.tar.gz` file

     ```bash
     unzip METACATUI_1_14_14.zip
     ```

3. Open the `metacatui/src/main/webapp/index.html` file in a text editor and in the `<script>` tag on line 14:
      * set the `data-theme` attribute to `dataone`
      * Remove the `data-metacat-context` value (it is usually set to `metacat`, so just remove the word `metacat`.
      * set the `data-map-key` attribute to your Google Maps API key.
            
           * Google Maps API keys can be obtained via the Google Developers Console (https://console.developers.google.com/apis/credentials). You can also copy & paste the Google Maps API key from the currently-installed Search UI `index.html` file.
      * The finished `<script>` tag will look similar to this:

           ```html
           <script id="loader" type="text/javascript" src="loader.js?v=1.14.14" 
         data-theme="dataone" 
         data-metacat-context=""
         data-map-key="AIzaSyCFcgRnv0TwBEdAnTsG5rBbD6Hprrv_Yic"
            ></script>
           ```

4. _If you are updating `search.dataone.org` in the production environment, then skip step 4._
 If updating a non-production environment, (e.g. search-sandbox-2.test.dataone.org), set the `d1CNBaseUrl` property in `metacatui/src/main/webapp/js/themes/dataone/models/AppModel.js`to the base URL for the current environment (e.g. `https://cn-sandbox-2.test.dataone.org/`).

    The `AppModel` property will look similar to this:

     ```js
     d1CNBaseUrl: "https://cn-sandbox-2.test.dataone.org/",
     ```

5. Backup the currently-installed Search UI files

     ```bash
     cp -rf /var/www/search.dataone.org .
     ```

6. Move the new search UI files to the root directory where web files are served.

     ```bash
     cp -rf metacatui-METACATUI_1_14_14/metacatui/src/main/webapp/* /var/www/search.dataone.org/
     ```

## Installing a new Search UI
1. Set up a VM and configure Apache to serve web files from a directory in `/var/www/`. Follow steps 1-5 above to install MetacatUI in the `/var/www/` directory.

2. If having issues with CORS requests to the CN, configure Apache to proxy requests to DataONE CN API calls. Add the following Apache directives:

     ```
     SSLProxyEngine on
     ProxyPass "/cn/v2/" "https://cn.dataone.org/cn/v2/"
     ProxyPassReverse "/cn/v2/" "https://cn.dataone.org/cn/v2/"
     ```

     Enable these Apache mods:
     ```bash
     a2enmod proxy_http
     a2enmod proxy
     ```