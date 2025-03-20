const propertyService = require('./propertyService');


exports.createProperty = async (req, res) => {
  try {
    const property = await propertyService.createProperty(req.body, req.user.id);
    res.status(201).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating property' });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await propertyService.getAllProperties();
    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching properties' });
  }
};

exports.getProperty = async(req, res) => {
    try {
        const property = await propertyService.getProperty(req.body.property_id);
        res.status(200).json(property);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error fetching property"})
    }
}
