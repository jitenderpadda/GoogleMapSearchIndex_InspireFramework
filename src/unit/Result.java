package unit;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Result {
	  public double lat;
	  public double lon;
	  public String name;
	  
	  public Result() {}
	  
	  public Result(double lat, double lon, String name) {
		  this.lat=lat;
		  this.lon=lon;
		  this.name=name;
	  }
}
