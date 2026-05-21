package webservices;

import entities.UniteEnseignement;
import metiers.UniteEnseignementBusiness;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
@Path("/ue")



public class UEws {
    static UniteEnseignementBusiness uniteEnseignementBusiness = new UniteEnseignementBusiness();

    @Path("/list")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getall() {
        return Response.ok(uniteEnseignementBusiness.getListeUE()).build();
    }

    @Path("/add")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response addUE(UniteEnseignement ue) {
        uniteEnseignementBusiness.addUniteEnseignement(ue);
                return Response.status(Response.Status.CREATED).entity("successfully operation").build();
    }


    @Path("/list/{code}")
    @DELETE
    @Produces(MediaType.TEXT_PLAIN)
    public Response deleteUE(@PathParam("code") int code) {
        uniteEnseignementBusiness.deleteUniteEnseignement(code);
        return Response.status(200).entity("successfully operation").build();
    }
    @Path("/list/update/{code}")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response updateUE(UniteEnseignement ue, @PathParam("code") int code) {
        uniteEnseignementBusiness.updateUniteEnseignement(code,ue);
        return Response.status(Response.Status.CREATED).entity("successfully operation").build();
    }
}

