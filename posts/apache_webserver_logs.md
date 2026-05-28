# Onboarding Apache Web Server Logs

In this blog we will see how we can onboard logs from Apache Web Server in Splunk

![](../posts/static/images/Pasted%20image%2020260527193336.png)

Spidering means making a copy of every page of a website. Scanning means vulnerability scanning or checking for missing configuration pages.

## Task

- Install Apache Web Server on Ubuntu Server
- Configure log format for Apache
- Install the Apache Add-on on the Splunk host
- Configure `inputs.conf` on the UF

```shell
sudo apt install apache2
```

![](../posts/static/images/Pasted%20image%2020260528113545.png)

Reference: https://splunk.github.io/splunk-add-on-for-apache-web-server/Configure/

The add-on supports two formats:

- `splunk_kv`
- `splunk_json`

## Apache Log Format

{% raw %}
```txt
LogFormat "time=%t.%{usec_frac}t, bytes_in=%I, bytes_out=%O, cookie=\"%{Cookie}i\", server=%v, dest_port=%p, http_content_type=\"%{Content-type}i\", http_method=\"%m\", http_referrer=\"%{Referer}i\", http_user_agent=\"%{User-agent}i\", ident=\"%l\", response_time_microseconds=%D, client=%h, status=%>s, uri_path=\"%U\", uri_query=\"%q\", user=\"%u\"" splunk_kv

```txt
#LogFormat "{\"time\":\"%t.%{usec_frac}t\", \"bytes_in\":\"%I\", \"bytes_out\":\"%O\", \"cookie\":\"%{Cookie}i\", \"server\":\"%v\", \"dest_port\":\"%p\", \"http_content_type\":\"%{Content-type}i\", \"http_method\":\"%m\", \"http_referrer\":\"%{Referer}i\", \"http_user_agent\":\"%{User-agent}i\", \"ident\":\"%l\", \"response_time_microseconds\":\"%D\", \"client\":\"%h\", \"status\":\"%>s\", \"uri_path\":\"%U\", \"uri_query\":\"%q\", \"user\":\"%u\"}" splunk_json
```
{% endraw %}

Here iam using the Splunk Json format


![](../posts/static/images/Pasted%20image%2020260528120158.png)

![](../posts/static/images/Pasted%20image%2020260528120255.png)

This loads the configuration files at runtime without overwriting other `conf` files.

## Apache Configuration

Create a config file in `conf-available` and enable it through `conf-enabled`:

```shell
sudo nano log-splunk.conf
```

Paste this into `log-splunk.conf` and comment the `splunk_kv` format if you want to use `splunk_json` instead.

{% raw %}
```apache
<IfModule log_config_module>
	# The following directives define some format nicknames for use with
	# a CustomLog directive (see below).
	LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\"" combined
	LogFormat "%h %l %u %t \"%r\" %>s %b" common

	<IfModule logio_module>
		# You need to enable mod_logio.c to use %I and %O
		LogFormat "time=%t.%{usec_frac}t, bytes_in=%I, bytes_out=%O, cookie=\"%{Cookie}i\", server=%v, dest_port=%p, http_content_type=\"%{Content-type}i\", http_method=\"%m\", http_referrer=\"%{Referer}i\", http_user_agent=\"%{User-agent}i\", ident=\"%l\", response_time_microseconds=%D, client=%h, status=%>s, uri_path=\"%U\", uri_query=\"%q\", user=\"%u\"" splunk_kv
		#LogFormat "{\"time\":\"%t.%{usec_frac}t\", \"bytes_in\":\"%I\", \"bytes_out\":\"%O\", \"cookie\":\"%{Cookie}i\", \"server\":\"%v\", \"dest_port\":\"%p\", \"http_content_type\":\"%{Content-type}i\", \"http_method\":\"%m\", \"http_referrer\":\"%{Referer}i\", \"http_user_agent\":\"%{User-agent}i\", \"ident\":\"%l\", \"response_time_microseconds\":\"%D\", \"client\":\"%h\", \"status\":\"%>s\", \"uri_path\":\"%U\", \"uri_query\":\"%q\", \"user\":\"%u\"}" splunk_json
		#LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"\" combinedio
	</IfModule>

	# The location and format of the access logfile (Common Logfile Format).
	# If you do not define any access logfiles within a <VirtualHost>
	# container, they will be logged here. Contrariwise, if you do define
	# per-<VirtualHost> access logfiles, transactions will be logged therein
	# and not in this file.

	# CustomLog "logs/access_log" common

	# If you prefer a logfile with access, agent, and referer information
	# (Combined Logfile Format) you can use the following directive.
	# CustomLog "logs/access_log" splunk_kv
	# CustomLog "logs/access_log" splunk_json
	# CustomLog "logs/access_log" combined
</IfModule>
```
{% endraw %}

![](../posts/static/images/Pasted%20image%2020260528121041.png)

Change the Apache access log path to the `splunk_json` format.

![](../posts/static/images/Pasted%20image%2020260528122131.png)

Now specify the `splunk_json` log format there.

![](../posts/static/images/Pasted%20image%2020260528122636.png)

## Enable the Config

Use `a2enconf` to enable the file:

```shell
sudo a2enconf log-splunk
```

![](../posts/static/images/Pasted%20image%2020260528122903.png)

![](../posts/static/images/Pasted%20image%2020260528123036.png)

The `log-splunk` file is now enabled. Reload Apache:

```shell
sudo systemctl reload apache2
```

![](../posts/static/images/Pasted%20image%2020260528123336.png)

![](../posts/static/images/Pasted%20image%2020260528123522.png)

## Splunk Add-on

Install the add-on in Splunk UI and provide your Splunk website credentials when prompted.

![](../posts/static/images/Pasted%20image%2020260528123643.png)

![](../posts/static/images/Pasted%20image%2020260528125433.png)

## inputs.conf

Add `inputs.conf` for shipping the logs.

![](../posts/static/images/Pasted%20image%2020260528125555.png)

If there is no `apache2` folder yet, create this structure:

```text
apache_inputs > default > inputs.conf
```

![](../posts/static/images/Pasted%20image%2020260528132606.png)

Add this to `inputs.conf`:

```conf
[monitor:///var/log/apache2/access.log]
sourcetype = apache:access:json
index = test
disabled = 0
```

![](../posts/static/images/Pasted%20image%2020260528130457.png)

`outputs.conf` is already configured.

## Restart Splunk Forwarder

Restart Splunk to apply the changes:

```shell
sudo /opt/splunkforwarder/bin/splunk restart
```

![](../posts/static/images/Pasted%20image%2020260528130644.png)

![](../posts/static/images/Pasted%20image%2020260528132714.png)






