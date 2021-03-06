About
-----
Clicky is a small Google Analytics plugin that allows you to track and measure
click events on links. 

Dependencies
------------
- jQuery
- jQuery Simulate (included)
- Universal Analytics

Analytics Data
--------------
Everything is sent to Google Analytics via Events. You'll see five main event
types within the link category: link:internal, link:external, link:download,
link:email and link:telephone.

Quick Start
-----------

```
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="/jquery.simulate.js"></script>
<script src="/jquery.clicky.js"></script>
<script>
    $(function() {
        $.clicky();
    });
</script>
```

Options
-------
**categories: ['internal', 'external', 'download', 'email', 'telephone']**

Set the type of links you'd like to track. For instance, if you wish to only track external 
links then instantiate the library with:

```
$.clicky({
    categories: ['external']
});
```

**categoryName: 'link:'**

This is the prepended string to the Google Analytics category name. With the default setting, 
GA categories will look like - link:internal, link:external, etc...

**action: 'click'**

Google Analytics event action string name.

**downloadFileTypes: /\.(zip|exe|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav)$/i**

Regex of matched file extensions that will be treated as a download link.

**disableClass: 'noclicky'**

Add the class 'noclicky' on a link to disable event tracking.

Here's an example of all options:

```
$.clicky({
    categories: ['internal', 'external', 'download', 'email', 'telephone'],
    categoryName: 'link:',
    action: 'click',
    downloadFileTypes: /\.(zip|exe|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav)$/i,
    disableClass: 'noclicky'
});
```
