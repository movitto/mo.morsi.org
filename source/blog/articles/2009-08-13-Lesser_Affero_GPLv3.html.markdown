---
title: Lesser Affero GPLv3
date: 2009-08-13
---

Before I begin, I am not a lawyer and this is NOT to be taken as legal advice. No actions should be taken based on this blog post alone and I take no responsibility for any outcomes which may result from doing so.

The <a href="http://fsf.org">Free Software Foundation</a> (FSF) provides many great software licenses for use in <a href="http://en.wikipedia.org/wiki/Free_and_open_source_software">FOSS</a> projects. Some of the more popular licenses include

-GPL: forces any developer using, modifying, or linking against GPL code to also release their code as free software under the GPL license if they are releasing their code in binary form

-LGPL: Additions to the GPL exempting developers who are only linking against GPL code and do not incorporate any changes to the GPL-licensed code base, from having to license their software under the GPL. eg. If you link against a LGPL library without modifications, your code or the license that it falls under does not need to be changed

-AGPL: a newcomer, the Affero General Public License, extends the GPL to close a loophole in which proprietary software may 'steal' and modify open code, and only provide access via a network interface or service. Since the binary isn't being distributed in the conventional means, the proprietary developers can make all the changes they want to GPL code and distribute it as a service over a network interface without having to release their changes. The AGPL closes this loophole and requires developers to release source code if modifying AGPL code served  primarily over a network interface<br/>

Unfortunately no 'lesser' version of the AGPL currently exists. Eg a license permitting any code to link against an LAGPL (lesser AGPL) library and distribute binaries or access via a network interface without fuss, while at the same time restricting code that incorporates modified components of LAGPL-licensed code such that derived works must also be licensed under the LAGPL.

Based on some advice (once again none of this is legal advice and i'm not responsible for anything you do) you can essentially create your own simple 'LAGPL'. Since the LGPL is just additional privileges ontop of the GPL, you can simply add a provision to your software license that extends the AGPL allowing developers who merely link against your code or include it without modifications (eg headers) to not have to relicense their code under the AGPL. Something like this should work for what you need:

<pre>
[[project name]] is free software, you can redistribute it and/or modify
it under the terms of GNU Affero General Public License
as published by the Free Software Foundation, either version 3
of the License, or (at your option) any later version.

You should have received a copy of the the GNU Affero
General Public License, along with [[project name]]. If not, see
<http://www.gnu.org/licenses/>

Additional permission under the GNU Affero GPL version 3 section 7:

If you modify this Program, or any covered work, by linking or
combining it with other code, such other code is not for that reason
alone subject to any of the requirements of the GNU Affero GPL
version 3.
</pre>

The GPL and AGPL both permit any additional restrictions and permissions to be removed by developers. So for example you can take LGPL code and remove the 'linker-friendly' permission, changing the derived work so as to be licensed under the GPL. For that reason you want to start with a 'strong' / restrictive license such as the AGPL and add on the 'linker-friendly' permission, which if removed will result in your code being freer than it is now. If you started with the LGPL and added the 'affero clause' restriction, it can be subsequently removed resulting in your code being less free (eg the network loophole is still wide open). 

Hope this helps!
