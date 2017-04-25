---
title: A few caveats with Boost Asio
date: 2009-08-10
---

<a href="http://www.boost.org/doc/libs/1_39_0/doc/html/boost_asio.html">Boost Asio</a> is a great networking library for C++. I'm not going to go into all the details here, but needless to say it provides all the necessary classes and operations necessary to use socket-based networking in C++. While it is very useful, there are a few caveats here and there that are annoying and require some thought on the developers part. Currently, here are the issues I've found with Boost Asio:

* It is impossible to cancel synchronous operations. So for example, if you launch boost::asio::ip::tcp::acceptor.accept or boost::asio::ip::tcp::socket.receive, you will not be able to cancel this operation unless the process or thread it is running on is killed. Obviously this makes cleaning up this operation a pain, and thus I suggest using the asynchronous versions, eg async_accept and async_receive, with a callback so that these operations can be canceled when the socket or acceptor 'close' method is invoked (syncing up with an external callback is a pain in itself, but is currently the only solution to this problem)

* When disconnected / closed, a 'remote' socket will behave no differently / yield no indication of the disconnected status. So for example, if you have a client connect to the server, then disconnect from it, the server's socket which the client was connected to will yield no exception or error status, and even the socket::is_open method will return true (the client's socket on the other hand will indicate that it is closed). The only way to detect the 'disconnected' event on the remote side is to have a hanging 'receive' or 'async_receive' operation, which will be canceled upon the socket disconnect event. The error thrown by this method or passed to the callback will indicate that the socket is disconnected, which you can then properly handle. Once again, a pain, especially if you want a connected socket that isn't receiving data (for example sending only).

Thats all for now, I'll post any other issues as I find them (try to guess what my next project incorporating boost asio is). It would be nice if these issues were resolved but I feel like they have more to do w/ the underlying Berkeley socket system than the Boost Asio library itself. Hope this helps!
