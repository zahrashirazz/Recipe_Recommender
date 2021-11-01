# describing an ec2 instance for web server
resource "aws_instance" "ec2-webserver" {
    # using standard ami and instance type defined in parameters
    ami           = var.ami_id
    instance_type = var.instance_type

    # using the public subnet
    subnet_id     = module.vpc.subnet_public_id

    # predefined key for terraform in AWS
    key_name      = "terraform-key"
    vpc_security_group_ids = [ aws_security_group.ec2-sg.id ]
    associate_public_ip_address = true

    # Assigning name tag
    tags = {
        Name = "SRIJAS-web-server"
    }

    # declaring dependencies
    depends_on = [ module.vpc.vpc_id, module.vpc.igw_id]

    # shell script to be run after initializing the server
    /*
        This shell script will install mysql client on web server and add the default address of rds db instance to it's dbdomain file.
        It will install standard LAMP server for PHP, MySQL and Apache services.
        It will install git to clone the repository from the master branch.
        Also other required PHP dependencies
        It will then clone the repository in to /home/ubuntu/project directory
        Create a dynamic parameters.json file for all the dynamically created resources information.
        And move all the web files to /var/www/html where Apache points.
        Finally it will run the sql script stored in Code/Database/Schema directory to initialize the database and populate the default data in it. 
    */
    user_data = <<EOF
#!/bin/sh
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install --yes nodejs
sudo apt install npm -y
sudo npm install -g n
sudo npm i -g npx
mkdir project
cd project
git clone https://github.com/PvPatel-1001/Recipe_Recommender.git
cd ../backend
npm install
nohup npx nodemon > /dev/null 2>&1 &
cd Recipe_Recommender/Code/frontend
sudo sed -i 's/##serverIp##/54.87.50.91/g' /src/apis/recipeDB.js
npm install
npm start
EOF
}

# describing the security group for ec2 instances
resource "aws_security_group" "ec2-sg" {
  name        = "security-group"
  description = "allow inbound access to the EC2 instance"

  # using the vpc created earlier for this security group
  vpc_id      = module.vpc.vpc_id

  # allowing all inbound and outbound traffic for ec2 instances.
  ingress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = [ "0.0.0.0/0" ]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}