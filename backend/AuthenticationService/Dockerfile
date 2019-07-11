FROM microsoft/dotnet:sdk As build
WORKDIR /app

COPY *.csproj ./
RUN dotnet restore

COPY . ./
WORKDIR /app
RUN dotnet publish -c Release -o out

FROM microsoft/dotnet:aspnetcore-runtime
WORKDIR /app
COPY --from=build /app/out ./
ENTRYPOINT ["dotnet","AuthenticationService.dll"]