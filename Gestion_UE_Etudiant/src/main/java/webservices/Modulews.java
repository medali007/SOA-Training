package webservices;

import entities.Module;
import entities.UniteEnseignement;
import metiers.ModuleBusiness;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
@Path("/module")

public class Modulews {
    static ModuleBusiness module = new ModuleBusiness();


    @Path("/list")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getall() {
        return Response.ok(module.getAllModules()).build();
    }

    @Path("/add")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response addUE(Module mo) {
        module.addModule(mo);
        return Response.status(Response.Status.CREATED).entity("successfully operation").build();
    }


    @Path("/list/{matricule}")
    @DELETE
    @Produces(MediaType.TEXT_PLAIN)
    public Response deleteUE(@PathParam("matricule") String matricule) {
        module.deleteModule(matricule);
        return Response.status(200).entity("successfully operation").build();
    }
    @Path("/list/update/{matricule}")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response updateUE(Module mo, @PathParam("matricule") String matricule) {
        module.updateModule(matricule,mo);
        return Response.status(Response.Status.CREATED).entity("successfully operation").build();
    }
}
