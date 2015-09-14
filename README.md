# FileBrowser
PhoneGap File Browser for v0.2.4 of the file plugin

This was originally built when PG 1.9 was the current version and 0.2.4 was current for the file plugin in Dec of 2013. BUT, 
ever since I posted it to my blog people keep asking me for the code so I’m providing it here and showing how to install the 
old version of the file plugin so you can run it in PG 5.2.1. 

You should really use the current file plugin since as of this writing they are on version 3.... 

To add Android 4.1.1 to your PG project:

 - phonegap platform add android@4.1.1

To install file plugin version 0.2.4:

 - Download the 0.2.4 snapshot to your computer
   https://git-wip-us.apache.org/repos/asf?p=cordova-plugin-file.git;a=commit;h=27288cd5cd28516e92bb6b9f811dac5d4a5729fb
 - Extract the files
 - Install the plugin locally via:
 - $ phonegap plugin add PATH_TO_PLUGIN
   Where the text “PATH_TO_PLUGIN” is the path to the folder containing the plugin’s “plugin.xml” file. For example, on my 
   computer the complete command was: phonegap plugin add c:\projects\file_plugin_old\cordova-plugin-file-8a29d64
