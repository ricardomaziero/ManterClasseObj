using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ManterClasseObj.Data;
using Microsoft.AspNetCore.Authentication.Certificate;
using Serilog;
using Serilog.Sinks.MSSqlServer;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();

var columnOption = new ColumnOptions();
columnOption.Store.Remove(StandardColumn.MessageTemplate);
columnOption.Store.Remove(StandardColumn.Level);
columnOption.Store.Remove(StandardColumn.Exception);
columnOption.Store.Remove(StandardColumn.Properties);

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .WriteTo
    .MSSqlServer(connectionString: "Server=arasrvvirssd009; Database=cast_treinamento_dsv; " +
    "User ID=cast_treinamento; Password=r35a2afa; Trusted_Connection=False",
    sinkOptions: new MSSqlServerSinkOptions { AutoCreateSqlTable = true, TableName = "LogsClasseRicardo" },
    columnOptions: columnOption)
    .CreateLogger();

builder.Services.AddAuthentication(
        CertificateAuthenticationDefaults.AuthenticationScheme)
    .AddCertificate();

builder.Services.AddDbContext<ManterClasseObjContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ManterClasseObjContext")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseAuthentication();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(x => x.AllowAnyOrigin()
.AllowAnyMethod()
.AllowAnyHeader());

app.MapControllers();

app.Run();
