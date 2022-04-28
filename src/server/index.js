// import { createServer, Model, Response } from "miragejs";

// export function server() {
//   createServer({
//     models: {
//       user: Model,
//     },

//     seeds(server) {
//       server.create("user", { id: 1, name: "Brunno", lastname: "Faria", email: "brunnofaria@gmail.com", password: "123456" });
//       server.create("user", { id: 2, name: "Marcos", lastname: "Spano", email: "e.marcosspano@gmail.com", password: "123456" });
      
//     },

//     routes() {
//       this.namespace = "/api";
//       this.timing = 2000;

//       this.post("/login", (schema, request) => {
//         const { email, password } = JSON.parse(request.requestBody);

//         const userExists = schema.where("user", (data) => {
//           if(data.email === email) {
//             return data;
//           }
//         });

//         const user = userExists.models[0]?.attrs;

//         if(!user) {
//           return new Response(401, { errors: 'Email ou senha inválidos.'});
//         }

//         if(user.password !== password) {
//           return new Response(401, { errors: 'Email ou senha inválidos.'});
//         }

//         return {
//           user,
//           token: "0b8cdecb9f9058eec7ae8db6ca1c76c992590a1d"
//         }
//       });
//     },
//   })
// }
