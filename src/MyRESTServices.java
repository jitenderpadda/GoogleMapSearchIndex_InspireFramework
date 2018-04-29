import javax.ws.rs.ApplicationPath;
import org.glassfish.jersey.server.ResourceConfig;
@ApplicationPath("restservices")
public class MyRESTServices extends ResourceConfig {
    public MyRESTServices() {
        packages("com.fasterxml.jackson.jaxrs.json");
        //packages("com.pegaxchange.java.web.rest");
    }
}