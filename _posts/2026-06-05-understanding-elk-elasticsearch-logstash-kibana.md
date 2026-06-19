---
layout: post
title: "Understanding ELK (Elasticsearch, Logstash, Kibana)"
date: 2026-06-05
tags: [elk, elasticsearch, logstash, kibana, blue-team]
excerpt: "A comprehensive guide and set of personal notes on setting up and testing Elasticsearch, Logstash, and Kibana on Ubuntu Server."
---

# Understanding ELK (Elasticsearch, Logstash, Kibana)

These are my personal notes related to ELK

`Lab Architecture:`

- OS: Ubuntu Server Latest
- RAM: 8GB
- Disk: 40GB

`Tools`

- Elasticsearch
- Logstash
- Kibana

- [ ] `Tasks`
	- [ ] Install Each Tool
	- [ ] Test Each Tool
	- [ ] Configure them to launch automatically


### Installing Latest Ubuntu Server:

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117174953.png" %}


Installing SSH-server:

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117175012.png" %}

First we need to install `openjdk`

`sudo apt-get install openjdk-8-jre`

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117175113.png" %}

### Installing Elasticsearch:

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117175418.png" %}

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117175430.png" %}

`sudo dpkg -i elasticsearch-9.2.4-amd64.deb`

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117180132.png" %}

Enabling Elasticsearch service

`sudo /bin/systemctl enable elasticsearch.service`

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117180312.png" %}

Starting Elasticsearch:
`sudo systemctl start elasticsearch.service`

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117180452.png" %}

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117180621.png" %}

Testing Elasticsearch its running or not without any additional component.

Resetting Password of Elasticsearch:
`sudo /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic`

	Elasticsearch Password: `l1xKw1SQbg0W7rpCuEAR`

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117181424.png" %}

`curl -k -u elastic https://localhost:9200`

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117181507.png" %}

If this command is running then we can say Elasticsearch is successfully running and installed on the server.

### Installing Logstash:

Need to download from elastic website.

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117182121.png" %}

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117182210.png" %}

`sudo dpkg -i logstash-9.2.4-amd64.deb`
`sudo /bin/systemctl daemon-reload`
`sudo systemctl enable logstash.service`
`sudo systemctl start logstash.service`

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117184120.png" %}

Changing some of the Logstash Configs:

By default they are at

`ls /etc/logstash/`

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117184343.png" %}

Need to make this `true:`

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117184854.png" %}

Enable this:

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117185038.png" %}

Now we need to restart Logstash: `sudo systemctl restart logstash.service`

### Installing Kibana:

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117185323.png" %}

Same steps did earlier:

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117190255.png" %}
Main Config File:

`sudo nano /etc/kibana/kibana.yml`

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117190717.png" %}
Here need to enable because Elasticsearch is listening on same port and localhost because listening on same machine.

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117191001.png" %}

Need to add IP address of the machine so that i can access the Kibana from My Host browser as server don't have GUI.

As Kibana Listens on port 5601. I will try to access that from my browser.

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117191225.png" %}

Here are the commands for Configuration:

`sudo /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token --scope kibana
`
then its asks for verification code:

`sudo ./kibana-verification-code` we will get this `/usr/share/kibana/bin`

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117191721.png" %}

As now we are in:

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117191826.png" %}

### Indexing and Searching Data in ES:

Difference Between Relational DB & Elasticsearch:

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117202418.png" %}

**Indexes:**

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117210230.png" %}

**Documents:**

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117210356.png" %}

### Basics of CRUD: Create, Read, Update, Delete:

##### Manually Creating Data into Logstash:

**PUTT:** PUTT is an HTTP method. It used to upload data into the elastic search.

`PUT /athletes/footbatll/1` --> /index/`_doc`/id

and after this `docunment` as shown below, in version onwards 7x type was removed there is only one type `_doc`: 

```json
PUT /athletes/_doc/1
{
    "first_name":"Muhammad",
    "last_name":"Saad",
    "position":"PG",
    "number":1,
    "team":"Pakistan"

}
```

As now data is added in elasticsearch now we will try to get that data using

#### Reading Data:


```json
GET /athletes/_doc/1
```

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117230125.png" %}

Actual Document we can get in `_source` 

#### Updating Data:

Here Elasticsearch is different from other databases, we can not update the data we need to replace it as shown below:

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117231347.png" %}

As we can see that the results have been updated.

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117231430.png" %}

Before Updating Data:

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117231531.png" %}

After Updating:

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117231621.png" %}

As we can see here `version` has been updated after updating the data as shown above.

Let say if we want to change only one field then we will not use **PUT** we will using **POST** method with `_update` instead of `_doc`.  because PUT will replace whole DOC instead of replacing only single field.Doc is why so Elasticsearch update this doc field with previous.

```json
POST /athletes/_update/1
{
    "doc":{
        "number": "0301465"
    }
}
```

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117232615.png" %}

As we can see number has been changed successfully.

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260117232642.png" %}

#### Deleting Data:

We can delete the data using `DELETE /index/type/id`

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260118000241.png" %}

After Deleting:

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260118000349.png" %}

#### Finding Number of Available Indexes?

`GET _cat/indices`

yellow = indexes

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260118001120.png" %}

accessing this using **CURL:**
` curl -k -u elastic https://localhost:9200/students/_doc/21?pretty`

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260118001756.png" %}

#### How Searching Data in ES Works:

Difference Between Query and Filter:

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260118131348.png" %}

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260118132240.png" %}

#### Adding Bulk Data using Postman:

Here Iam unable to add bulk data using DEV Tools so i used postman. Below is the json i used.

```json
{"index":{}}

{"last_name":"Saad","first_name":"lebron","position":"sf","number":"23","team":"cleveland","ppg":28,"past_teams":[{"team1":"Cleveland","team2":"Miami"}]}

{"index":{}}

{"last_name":"curry","first_name":"steph","position":"pg","number":"30","team":"golden state","college":"davidson","ppg":25}

{"index":{}}

{"last_name":"Saad","first_name":"john","position":"pg","number":"2","team":"washington","college":"kentucky","ppg":16}

{"index":{}}

{"last_name":"ulis","first_name":"tyler","position":"pg","number":"8","team":"phoenix","college":"kentucky","ppg":6}

{"index":{}}

{"last_name":"durant","first_name":"kevin","position":"pf","number":"35","team":"golden state","college":"texas","ppg":27,"past_teams":[{"team1":"oklahoma city"}]}

{"index":{}}

{"last_name":"bryant","first_name":"kobe","position":"sg","number":"24","team":"los angeles","college":"","ppg":31}

{"index":{}}

{"last_name":"stockton","first_name":"john","position":"pg","number":"12","team":"utah","college":"gonzaga","ppg":14}

{"index":{}}

{"last_name":"adebayo","first_name":"bam","position":"pf","number":"13","team":"miami","college":"kentucky","ppg":9}
```

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260118185931.png" %}

For fetching all the data from an index in elastic search we need to use this query.

```json
GET basketball/_search

{

  "query": {

    "match_all": {}

  }

}
```
	

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260118190110.png" %}

Query for matching specific fields as shown below.

```python
GET /students/_search
{
  "query": {
    "match": {
      "college": "kentucky"
    }
  }
}
```

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260118190346.png" %}

Query for searching multiple entities:

```python
GET /students/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "first_name": "john"
          }
        },
                {
          "match": {
            "team": "washington"
          }
        }
      ]
    }
  }
}
```

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260118192407.png" %}

Example for using `must_not`

```python
GET /students/_search

{

  "query": {

    "bool": {

      "must": [

        {

          "match": {

            "first_name": "john"

          }

        }

      ],

      "must_not": [

        {

          "match": {

            "team": "washington"

          }

        }

      ]

    }

  }

}
```

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260118201007.png" %}

##### Aggregating ES Data:

There are two types of **Aggregations:**
- [ ] Bucket Aggregation
- [ ] Matric Aggregation

#####  Bucket Aggregation:

It is based on values like `college, windows etc`.

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260201150033.png" %}

In **Bucket Aggregation** we place these things in buckets, looking in unique fields like color and placing/sorting them into buckets using unique characters.
Examples:

Shows how can we count specific fields.
 
{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260201152911.png" %}

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260201161430.png" %}

Here we created new field **good colleges** like need to get a list of number of students in college based on there count like number of students in `a` college and then number of students in `b` college it will sort the result. as above.

Sort in Ascending Order:

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260201165416.png" %}

```json
Get athletes/_search

{

  "aggs": {

    "best_teams": {

      "terms":{

        "field": "team.keyword",

        "order": {

          "_count": "asc"

        }

      }

    }

  }

}
```


#### Matric Aggregation:

It based on `numeric values`.Nested inside a Nested like `averege` points per game as shown below. 

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260201181750.png" %}

Other examples like `max` points and `min` points:

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260201181936.png" %}

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260201182017.png" %}

`Stats:` shows all max, min, avg, sum and count.

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260201182212.png" %}

##### Making an Custom Index with custom data type:

```json
PUT dfir

{

  "mappings": {

      "properties":{

        "srcip":{

          "type": "ip"

        },

        "dstip": {

          "type": "ip"

        }

      }

    }

  }
```

#### Mapping Index Data:

##### Dynamic vs Explicit Mapping:

Dynamic Mapping is default and we can feed any data we want in that.

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260201193243.png" %}

But in Explicit Mapping we need to defined what data is inserted.

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260201193438.png" %}

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260201194332.png" %}

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260201195420.png" %}

Here is the Example:

```json
PUT dfir/_doc/1

{

  "date":"2026-01-01",

  "srcip":"192.168.14.2",

  "dstip":"10.10.1.10",

  "response":"200",

  "method":"GET",

  "uri":"malware.google.liveupdate.com.pk/content.flag",

  "content":"text/plain"

  

}
```

Check for index mapping by GET `index_name`

```json
GET dfir
```

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260201195718.png" %}

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260201195738.png" %}

Here is the information about the mapping we set and This is an Example of Dynamic Mapping.

```json

{

  "dfir": {

    "aliases": {},

    "mappings": {

      "properties": {

        "content": {

          "type": "text",

          "fields": {

            "keyword": {

              "type": "keyword",

              "ignore_above": 256

            }

          }

        },

        "date": {

          "type": "date"

        },

        "dstip": {

          "type": "text",

          "fields": {

            "keyword": {

              "type": "keyword",

              "ignore_above": 256

            }

          }

        },

        "method": {

          "type": "text",

          "fields": {

            "keyword": {

              "type": "keyword",

              "ignore_above": 256

            }

          }

        },

        "response": {

          "type": "text",

          "fields": {

            "keyword": {

              "type": "keyword",

              "ignore_above": 256

            }

          }

        },

        "srcip": {

          "type": "text",

          "fields": {

            "keyword": {

              "type": "keyword",

              "ignore_above": 256

            }

          }

        },

        "uri": {

          "type": "text",

          "fields": {

            "keyword": {

              "type": "keyword",

              "ignore_above": 256

            }

          }

        }

      }

    },

    "settings": {

      "index": {

        "routing": {

          "allocation": {

            "include": {

              "_tier_preference": "data_content"

            }

          }

        },

        "number_of_shards": "1",

        "provided_name": "dfir",

        "creation_date": "1769957617677",

        "number_of_replicas": "1",

        "uuid": "L7dRnibbT26exE-ToKohFg",

        "version": {

          "created": "9039003"

        }

      }

    }

  }

}
```

##### Creating Explict Mappings:

```json
PUT /dfir

PUT /dfir

{

  "mappings": {

      "properties":{

        "date": {

          "type": "date"

        },

         "srcip": {

          "type": "ip"

        },

         "dstip": {

          "type": "ip"

        },

         "response": {

          "type": "integer"

        },

         "method": {

          "type": "text"

        },

         "url": {

          "type": "text"

        },

         "content": {

          "type": "text"

        }

    }

  }

}
```

```json
  "mappings": {

      "properties": {

        "content": {

          "type": "text"

        },

        "date": {

          "type": "date"

        },

        "dstip": {

          "type": "ip"

        },

        "method": {

          "type": "text"

        },

        "response": {

          "type": "integer"

        },

        "srcip": {

          "type": "ip"

        },

        "url": {

          "type": "text"

        }

      }

    }
```

references: https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/field-data-types

#### Logstash Input: #logstash

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260206161840.png" %}

What is Logstash Pipeline:

A **pipeline** where data get **input**, **filters** and **outputs** as shown below.

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260206162139.png" %}

#### Getting Data into Logstash:
 {% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260206184541.png" %}

Reference: https://www.elastic.co/docs/reference/logstash/plugins/input-plugins

Location for Logstash Binary:

Here Logstash binary exists. We can run it manually.

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260206185101.png" %}

Here we can make our custom configurations. like `template.conf`

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260206185309.png" %}
##### Custom Config File:

In Logstash we always and only have these three things input, filter and output. Filter is always required. 
{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260206185622.png" %}

If we want that Logstash will use our configuration we need to place that in **conf.d** directory so after every three 3 according to our set time interval Logstash will read these configurations.

##### Output Section:

In output section we will sends all our logs to elastic search as shown below.
 
{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260206191156.png" %}

For the input we can see what plugin we need to use from elastic input plugins here i used the file and check for its requirements here it only required only file path and i used start position to get logs from the start.

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260206192911.png" %}

and then we moved our file to **conf.d**

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260206193044.png" %}

Now we need to check logs for Logstash to confirm our configuration is working fine or not.

Location: `/var/log/logstash/logstash-plain.log`

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260206193226.png" %}

But first we need to make an `conf` file in which we can add our elastic credentials so that Logstash will communicate with elastic here is an config file and here the plugin i used in `file plugin`.

```json
input {

        file {
                path => "/var/log/auth.log"
                start_position => "beginning"
}
}
filter {
}
output {
  elasticsearch {
    hosts => ["https://localhost:9200"]
    user => "elastic"
    password => "l1xKw1SQbg0W7rpCuEAR"

    # Change 'ssl' to 'ssl_enabled'
    ssl_enabled => true

    # Keep this as 'none' for now to bypass certificate checks
    ssl_verification_mode => "none"
  }
}
```


{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260206194857.png" %}

` sudo usermod -a -G adm logstash` used this to give Logstash permissions.

Then our data started landing.

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260206231443.png" %}

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260206222617.png" %}

###### Using UDP Plugin:

```json
input {
        udp{
                port => 18001
                host => "192.168.79.150"
                codec => netflow
}
}
filter {
}
output {

    elasticsearch {
    hosts => ["https://localhost:9200"]
    user => "elastic"
    password => "l1xKw1SQbg0W7rpCuEAR"
    # Change 'ssl' to 'ssl_enabled'
    ssl_enabled => true
    # Keep this as 'none' for now to bypass certificate checks
    ssl_verification_mode => "none"
  }
}
```

Now for generation of Data first we need to listen on port 18001:

For Listening: `sudo tcpdump port 18001` we will use tcpdump.
For generating data we will use `fprobe` here i used my `wsl`

`fprobe:`  sudo fprobe -i eth0 `dest_ip`:`dest_prt`

for example: sudo fprobe -i eth0 192.168.79.150:18001

Now every type of data i created send to this ip where tcpdump is listening.

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260206231316.png" %}

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260206231324.png" %}
here our data lands in `logstash`

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260206231357.png" %}

##### Configuring Windows Beats Plugin:

```json
input {
        beats {
                port => 5044
                host => "192.168.79.150"
        }
}
filter {
}
output {
elasticsearch {
    hosts => ["https://localhost:9200"]
    user => "elastic"
    password => "l1xKw1SQbg0W7rpCuEAR"
    # Change 'ssl' to 'ssl_enabled'
    ssl_enabled => true
    # Keep this as 'none' for now to bypass certificate checks
    ssl_verification_mode => "none"
  }
}
```

Documentation: https://www.elastic.co/docs/reference/logstash/plugins/plugins-inputs-beats

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260207110537.png" %}

As we can see here listener is started Listening on port `5044` as shown above.

Need to Download Zip file from WinLogBeat:

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260207112843.png" %}

Now Saving and Renaming the file into out Windows Box:

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260207113108.png" %}

Now we need a `configuration file` to install it as a service.

Location: `C:\Program Files\Winlogbeat\winlogbeat.yml`

Logs we need:

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260207113949.png" %}

Sending Data to out Logstash:

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260207114017.png" %}

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260207114031.png" %}

Testing our configuration:

` .\winlogbeat.exe -c .\winlogbeat.yml test config -e`

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260207114624.png" %}

As we can see service in `installed` and in `stopped` state.
{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260207115242.png" %}

` Start-Service winlogbeat` use this command to start the service.

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260207121130.png" %}

Lets check for incoming data here first we have our Kibana IP and second one in Windows Box and data is coming as shown above.

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260207121331.png" %}

##### Logstash Filtering:

Using **filters** we can:

- [ ] Add Fields
- [ ] Remove Fields
- [ ] Change Fields
- [ ] Change fields data types
- [ ] Filter out events based on criteria
- [ ] Normalize Fields
- [ ] Bring Structure to Unstructured data

```json
input {
        file {
                path => "/etc/logstash/data/app_access.csv"
                start_position => "beginning"
                sincedb_path => "/dev/null"
        }
}
filter {
}
output {
elasticsearch {
    hosts => ["https://localhost:9200"]
    user => "elastic"
    password => "l1xKw1SQbg0W7rpCuEAR"

    # Change 'ssl' to 'ssl_enabled'
    ssl_enabled => true

    # Keep this as 'none' for now to bypass certificate checks
    ssl_verification_mode => "none"
  }
}
```

sincedb_path => "/dev/null": used to ask Logstash rereads file every time. 

And as we can see all our data is coming in one field that we need to fix.
 
{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260207130606.png" %}

Documentation: https://www.elastic.co/docs/reference/logstash/plugins/filter-plugins

Before Deleting system made indices we need to enable this:

```json
PUT /_cluster/settings
{
  "transient": {
  "action.destructive_requires_name":false
  }
}
```

Now `DELETE *` Works

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260207133219.png" %}

```json
filter {

        csv {
                columns => ["datetime","username","srcip","company","result","customer_id"]
}
}
```

This is how we can assign custom name to our data as shown above.

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260207143208.png" %}

###### Removing an Unwanted Field:

Using `mutate` we can perform different filters on a field
ref: https://www.elastic.co/docs/reference/logstash/plugins/plugins-filters-mutate

Let remove the message field and restart Logstash

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260207144906.png" %}

and see there is no `message` field

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260207145045.png" %}

As here we have two timestamps we will fix this and replace the UNIX one with the original one using the `date` plugin.

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260207145254.png" %}

using `UNIX_MS` to parse our time

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260207145532.png" %}

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260207145455.png" %}
As we can see here now date is sorted based on timestamp of logs.

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260207150552.png" %}

And here we also removed extra datetime field

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260207152314.png" %}

```json
filter {
        csv {
                columns => ["datetime","username","srcip","company","result","customer_id"]
}
        date {
                match => [ "datetime", "UNIX_MS" ]
}
        mutate {
                remove_field => ["message"]
                remove_field => ["datetime"]
}
}
```



We can use `geoip` plugin to enrich the information about the IP.
reference: https://www.elastic.co/docs/reference/logstash/plugins/plugins-filters-geoip

```json
filter {
        csv {
                columns => ["datetime","username","srcip","company","result","customer_id"]
}
        date {
                match => [ "datetime", "UNIX_MS" ]
}
        mutate {
                remove_field => ["message"]
                remove_field => ["datetime"]
}
        geoip {
                source => "srcip" 
                target => "geoip_src"
}
}
```

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260207234101.png" %}

 ###### Using Conditions in Logstash:

```json
filter {
        csv {
                columns => ["datetime","username","srcip","company","result","customer_id"]
}
        date {
	                match => [ "datetime", "UNIX_MS" ]
}
        mutate {
                remove_field => ["message"]
                remove_field => ["datetime"]
}
        geoip {
                source => "srcip"
                target => "geoip_src"
}
if [result] == "PASS" {

        mutate {
        replace => [result,"SUCCESS"]
}
}
}
```

Now As you can see here instead of **PASS** we get **SUCCESS**.

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260208101051.png" %}

##### Unstructured Data:

Created a Custom Squid Proxy Data.

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260222084131.png" %}

The Unstructured Data is like this.

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260222085604.png" %}

Now Using **Grok Filter** to parse the unstructured data into structure.

Reference: https://www.elastic.co/docs/reference/logstash/plugins/plugins-filters-grok

Pattern for Identifying Data: Regex Based
https://github.com/logstash-plugins/logstash-patterns-core/blob/main/patterns/ecs-v1/grok-patterns

https://grokdebugger.com/

Syntax of GROK:

`%{SYNTAX:SEMANTIC}`

Used Grok Debugger to make a pattern matching method

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260222092702.png" %}

```regex
%{NUMBER:datetime} %{INT:elapsed} %{IPV4:srcip} %{WORD:proxy_result}/%{INT:http_responsecode} %{INT:bytes_xferred} %{WORD:http_method} %{URI:url} %{WORD:squid_handler}/%{IPV4:dest_ip} %{GREEDYDATA:content_type}
```

Command to check logstash status:
`tail /var/log/logstash/logstash-plain.log | grep ".log"`

```json
input {

        file {

                path => "/var/log/proxy.log"

                start_position => "beginning"

                sincedb_path => "/dev/null"

        }

}

  

filter {

  

        grok {

                match => { message => "%{NUMBER:datetime} %{INT:elapsed} %{IPV4:srcip} %{WORD:proxy_result}/%{INT:http_responsecode} %{INT:bytes_xferred} %{WORD:http_method} %{URI:url} %{WORD:squid_handler}/%{IPV4:dest_ip} %{GREEDYDATA:content_type}"
  

                remove_field => [

                                "message"

                        ]

                }

        }

  

output {

  

elasticsearch {

    hosts => [

                "https://localhost:9200"

                        ]

    user => "elastic"

    password => "l1xKw1SQbg0W7rpCuEAR"

  

    # Change 'ssl' to 'ssl_enabled'

    ssl_enabled => true

  

    # Keep this as 'none' for now to bypass certificate checks

    ssl_verification_mode => "none"

                }

        }
```


{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260222103427.png" %}

##### Logstash Output:

Output Types:

- [ ] Elasticsearch
- [ ] CLI Standard Output
- [ ] File
- [ ] CSV
- [ ] Chat Client
- [ ] TCP/UDP 

Getting Data in my own Index:

```json
output {

elasticsearch {
    hosts => ["https://localhost:9200"]
    index => "dfir"
    user => "elastic"
    password => "l1xKw1SQbg0W7rpCuEAR"
    # Change 'ssl' to 'ssl_enabled'
    ssl_enabled => true

    # Keep this as 'none' for now to bypass certificate checks
    ssl_verification_mode => "none"
        }
}
```

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260222114947.png" %}

```json
output {
  if [http_responsecode] != 200 {
    elasticsearch {
      hosts => ["https://localhost:9200"]
      index => "http_weird"
      user => "elastic"
      password => "l1xKw1SQbg0W7rpCuEAR"
      ssl_enabled => true
      ssl_verification_mode => "none"
    }
  } 
  else {
    elasticsearch {
      hosts => ["https://localhost:9200"]
      index => "http_normal"
      user => "elastic"
      password => "l1xKw1SQbg0W7rpCuEAR"
      ssl_enabled => true
      ssl_verification_mode => "none"
    }
  }
}
```


{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260222131718.png" %}

{% include post-screenshot.html src="/assets/img/posts/Pasted%20image%2020260222131745.png" %}

##### Kibana:

https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-query-string-query

