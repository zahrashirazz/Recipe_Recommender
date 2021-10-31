# defining the outputs needed after completion of execution

# outputs for ec2 webserver
output "ec2-webserver-dns" {
    value = aws_instance.ec2-webserver.public_dns
}

output "ec2-webserver-ip" {
    value = aws_instance.ec2-webserver.public_ip
}

output "ec2-webserver-private-dns" {
    value = aws_instance.ec2-webserver.private_dns
}

output "ec2-webserver-private-ip" {
    value = aws_instance.ec2-webserver.private_ip
}
