FROM ubuntu

ADD bin /opt/mockchamp
ADD config.yml /opt/mockchamp
ADD ui/build /opt/mockchamp/ui/build
WORKDIR /opt/mockchamp

EXPOSE 8181

CMD ["./mockchamp", "--workdir", "/mockchamp"]
