const express = require("express");
const cors = require("cors");
const app = express();

const server = require("http").createServer(app);

// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//     // methods: ["GET", "POST"],
//   },
//   //   transports: ["websocket"],
// });
const { Server: SocketServer } = require("socket.io");

const io = new SocketServer(server, {
  cors: true,
});

const { ExpressPeerServer } = require("peer");
const { Server } = require("http");

const peerServer = ExpressPeerServer(server);

app.use(
  cors({
    origin: "*",
  })
);

app.use("/peerjs", peerServer);

const rooms = [];

io.on("connection", (socket) => {
  console.log(`[] Socket connected :: ${socket.id}`);
  socket.on("join-room", ({ roomId, userId }) => {
    socket.join(roomId);
    const user = {
      userId,
      socketId: socket.id,
    };
    const room = rooms.find((room) => room.id === roomId);

    if (room) {
      room.users.push(user);
    } else {
      rooms.push({ id: roomId, users: [user] });
    }

    socket.to(roomId).emit("user-connected", { userId });
  });

  socket.on("disconnect", () => {
    const room = rooms.find((room) =>
      room.users.find((user) => user.socketId === socket.id)
    );
    if (room) {
      const user = room.users.find((user) => user.socketId === socket.id);
      room.users = room.users.filter((user) => user.socketId !== socket.id);
      // console.log(user);
      io.to(room.id).emit("user-disconnected", {
        userId: user.userId,
      });
    }
  });
});

const port = 8000;

server.listen(port, () => {
  console.log("Server is running on port ", port);
});
