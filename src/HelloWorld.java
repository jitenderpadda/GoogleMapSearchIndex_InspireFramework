import java.util.ArrayList;

import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import query.RunQueryLatest;
import unit.Result;

import javax.ws.rs.Path;

// The Java class will be hosted at the URI path "/helloworld"
@Path("/helloworld")
public class HelloWorld {
    
    // The Java method will process HTTP GET requests
    @GET
    // The Java method will produce content identified by the MIME Media
    // type "text/plain"
    @Produces(MediaType.APPLICATION_JSON)
    public ArrayList<Result> getClichedMessage(@QueryParam("search") String search, @QueryParam("ResultSizeThreshold") int resultSizeThreshold) {
        // Return some cliched textual content
    	System.out.println("searchTerm---"+search);
    	RunQueryLatest runQuery= new RunQueryLatest("index", search, "index", "index", 2, 3, 9, 10, 5, resultSizeThreshold, 10, 0.01, 0.0025, 2, 0);
    	/*ArrayList<String> list=new ArrayList<String>();
    	list.add("Hello");
    	list.add(search);
        return list;*/
    	ArrayList<Result> response=runQuery.init();
    	for(Result res:response) {
    		System.out.println("res---"+res.name);
    		System.out.println("res---"+res.lat);
    		System.out.println("res---"+res.lon);
    	}
    	return response;
    }
}